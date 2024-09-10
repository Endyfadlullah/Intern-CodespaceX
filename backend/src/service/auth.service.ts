import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from 'src/common/validation.service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
} from 'src/model/app.model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from 'src/common/prisma.service';
import { UserValidation } from '../app/app.validation';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CustomMailerService } from '../mailer/mailer.service';
import { ZodError } from 'zod';
import { User } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

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
export class AuthService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private customMailerService: CustomMailerService,
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
        Created_at: getAdjustedDate(), // Diisi otomatis waktu sekarang saat dibuat
        Updated_at: getAdjustedDate(), // Diisi otomatis waktu sekarang saat data dimasukkan
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
      status: user.Status,
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
    const payload = {
      email: user.Email,
      username: user.Username,
      role: user.Role,
    };
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

  async forgotPassword(email: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { Email: email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Generate a 6-digit numeric token
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // Gunakan getAdjustedDate untuk mendapatkan waktu kadaluarsa token
    const expires = getAdjustedDate();
    expires.setHours(expires.getHours() + 1); // Token berlaku selama 1 jam

    // Simpan token ke database
    await this.prismaService.user.update({
      where: { Email: email },
      data: {
        ResetPasswordToken: token,
        ResetTokenExpires: expires,
      },
    });

    // Kirim email dengan token
    await this.customMailerService.sendResetPasswordEmail(email, token);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Validasi input
    try {
      UserValidation.RESET_PASSWORD.parse({
        token,
        newPassword,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpException(error.errors, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }

    // Gunakan getAdjustedDate untuk mendapatkan waktu saat ini
    const now = getAdjustedDate();

    // Cari pengguna dengan token reset yang valid
    const user = await this.prismaService.user.findFirst({
      where: {
        ResetPasswordToken: token,
        ResetTokenExpires: {
          gte: now, // Gunakan now untuk perbandingan
        },
      },
    });

    if (!user) {
      throw new HttpException(
        'Token tidak valid atau sudah kadaluarsa',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Perbarui password dan hapus token reset
    await this.prismaService.user.update({
      where: { Email: user.Email },
      data: {
        Password: hashedPassword,
        ResetPasswordToken: null,
        ResetTokenExpires: null,
        Updated_at: getAdjustedDate(),
      },
    });
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
      status: user.Status,
    };
  }
}