import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from 'src/conmmon/validation.service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
  UpdateUser,
  CreateUser
} from 'src/model/user.model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from 'src/conmmon/prisma.service';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

function getAdjustedDate(): Date {
   // Get current date and time
   const currentDate = new Date();

   // Calculate timezone offset in milliseconds (Asia/Jakarta is UTC+7)
   const timezoneOffsetMillis = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
 
   // Adjust current date to Asia/Jakarta timezone
   const adjustedDate = new Date(currentDate.getTime() + timezoneOffsetMillis);
 
   return adjustedDate;
}



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
        Created_at: getAdjustedDate(),  // Diisi otomatis waktu sekarang saat dibuat
        Updated_at: getAdjustedDate(),  // Diisi otomatis waktu sekarang saat data dimasukkan
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

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsersByRole(role?: string): Promise<User[]> {
    // Jika role adalah 'All Roles', tidak memfilter berdasarkan role
    const whereClause = role && role !== 'All Roles' 
      ? { Role: role, Deleted_at: null }
      : { Deleted_at: null };

    // Menjalankan query dengan whereClause yang sudah dibangun
    return this.prisma.user.findMany({
        where: whereClause,
    });
  }





  async findUserById(id: number) {
    return this.prisma.user.findUnique({ where: { ID_user: id } });
  }

  async updateUserById(id: number, data: UpdateUser): Promise<User> {
    // Prepare the updated data
    const updatedData: Partial<User> = {};

    if (data.email) {
      updatedData.Email = data.email;
    }
    
    if (data.password) {
      updatedData.Password = await bcrypt.hash(data.password, 10);
    }
    
    if (data.username) {
      updatedData.Username = data.username;
    }
    
    if (data.mobile_number) {
      updatedData.Mobile_number = data.mobile_number;
    }
    
    if (data.position) {
      updatedData.Position = data.position;
    }
    
    if (data.role) {
      updatedData.Role = data.role;
    }
    
    if (data.picture) {
      updatedData.Picture = data.picture;
    }
    
    if (data.status) {
      updatedData.Status = data.status;
    }

    updatedData.Updated_at = getAdjustedDate();  

    return this.prisma.user.update({ where: { ID_user: id }, data: updatedData });
  }

  async deleteUserById(id: number) {
    return this.prisma.user.delete({ where: { ID_user: id } });
  }

  async createUser(createUserDto: CreateUser): Promise<User> {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { Email: createUserDto.email },
    });

    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create a new user
    const newUser = await this.prisma.user.create({
      data: {
        Username: createUserDto.username,
        Email: createUserDto.email,
        Password: hashedPassword,
        Mobile_number: createUserDto.mobile_number,
        Position: createUserDto.position,
        Role: createUserDto.role || 'customer', // Default to 'customer'
        Picture: createUserDto.picture,
        Status: createUserDto.status || 'active', // Default to 'active'
        Created_at: getAdjustedDate(),  // Set creation date
        Updated_at: getAdjustedDate(),  // Set updated date
      },
    });

    return newUser;
  }


  async softDeleteUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { ID_user: id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      return await this.prisma.user.update({
        where: { ID_user: id },
        data: {
          Username: '-',
          Email: '-',
          Password: '-',
          Mobile_number: '-',
          Position: null,
          Picture: '-',
          Token: '-',
          Status: 'inactive',
          Deleted_at: getAdjustedDate(),
        },
      });
    } catch (error) {
      throw new HttpException('Failed to soft delete user', HttpStatus.BAD_REQUEST);
    }
  }

  async ReadAllTalent(): Promise<User[]> {
    return this.prisma.user.findMany({ where: { Role: 'talent', Deleted_at: null} });
  }
  
}




