import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from 'src/conmmon/validation.service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from 'src/model/user.model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from 'src/conmmon/prisma.service';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(request: RegisterUserRequest): Promise<UserResponse> {
    this.logger.debug(`Mendaftarkan pengguna baru: ${JSON.stringify(request)}`);
  
    // Validasi input pengguna
    const registerRequest: RegisterUserRequest = 
      this.validationService.validate(UserValidation.REGISTER, request);
  
    // Cek apakah email sudah terdaftar
    const existingUser = await this.prismaService.user.findUnique({
      where: { Email: registerRequest.email },
    });
  
    if (existingUser) {
      throw new HttpException('Email sudah terdaftar', HttpStatus.BAD_REQUEST);
    }
  
    // Hash password pengguna
    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);
  
    // Buat pengguna baru dengan data yang diperlukan
    const user = await this.prismaService.user.create({
      data: {
        Username: registerRequest.username,
        Email: registerRequest.email,
        Password: hashedPassword,
        Created_at: new Date(),  // Diisi otomatis waktu sekarang saat dibuat
        Updated_at: new Date(),  // Diisi otomatis waktu sekarang saat data dimasukkan
      },
    });
  
    // Return data pengguna yang telah terdaftar
    return {
        email: user.Email,
        username: user.Username,
        mobile_number: user.Mobile_number,
        position: user.Position,
        role: user.Role,
        picture: user.Picture,
        status: user.Status
    };
  }
  

  async login(request: LoginUserRequest): Promise<UserResponse> {
    // Validasi request
    const loginRequest: LoginUserRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    // Temukan pengguna berdasarkan email
    const user = await this.prismaService.user.findUnique({
      where: { Email: loginRequest.email },
    });

    if (!user) {
      this.logger.error('User not found');
      throw new HttpException(
        'Email atau password salah',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Periksa kecocokan password
    const passwordMatch = await bcrypt.compare(
      loginRequest.password,
      user.Password,
    );
    if (!passwordMatch) {
      this.logger.error('Password mismatch');
      throw new HttpException(
        'Email atau password salah',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Buat payload dan token JWT
    const payload = { email: user.Email, username: user.Username, role: user.Role };
    const token = this.jwtService.sign(payload);

    // Perbarui token di database
    await this.prismaService.user.update({
      where: { Email: user.Email },
      data: { Token: token },
    });

    this.logger.debug(`User logged in successfully. Token: ${token}`);

    return {
        email: user.Email,
        username: user.Username,
        mobile_number: user.Mobile_number,
        position: user.Position,
        role: user.Role,
        picture: user.Picture,
        status: user.Status,
      token,
    };
  }

  async getUsers(): Promise<UserResponse[]> {
    const users = await this.prismaService.user.findMany({
      select: {
        ID_user: true,
        Username: true,
        Email: true,
        Mobile_number: true,
        Position: true,
        Role: true,
        Picture: true,
        Status: true,
        
      }
    });

    // Pemetaan data agar sesuai dengan tipe UserResponse
    const formattedUsers: UserResponse[] = users.map(user => ({
        id : user.ID_user,
      username: user.Username,
      email: user.Email,
      mobile_number: user.Mobile_number,
      position: user.Position,
      role: user.Role,
      picture: user.Picture,
      status: user.Status,
    }));

    return formattedUsers;
  }
  
  

  async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    this.logger.debug(
      `UserService.update(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );

    // Validasi request
    const updateRequest: UpdateUserRequest = this.validationService.validate(
      UserValidation.UPDATE,
      request,
    );

    // Pastikan email valid
    const email = user.Email || updateRequest.email;
    if (!email) {
        throw new Error('Email is required to update user');
    }

    const updatedData: Partial<User> = {};

    if (updateRequest.password) {
      updatedData.Password = await bcrypt.hash(updateRequest.password, 10);
    }

    updatedData.Updated_at = new Date(); // Perbarui Updated_at

    // Perbarui pengguna berdasarkan email
    const result = await this.prismaService.user.update({
      where: { Email: email },
      data: updatedData,
    });

    // Kembalikan data pengguna yang telah diperbarui
    return {
        email: result.Email,
        username: result.Username,
        mobile_number: result.Mobile_number,
        position: result.Position,
        role: result.Role,
        picture: result.Picture,
        status: result.Status
    };
}




  async logout(user: User): Promise<UserResponse> {
    const result = await this.prismaService.user.update({
      where: { Email: user.Email },
      data: { Token: null },
    });

    return {
        email: user.Email,
        username: user.Username,
        mobile_number: user.Mobile_number,
        position: user.Position,
        role: user.Role,
        picture: user.Picture,
        status: user.Status
    };
  }
}
