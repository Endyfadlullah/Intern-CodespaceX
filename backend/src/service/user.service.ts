import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  UpdateUser,
  CreateUser,
  CreateCheckpointAttachment,
} from 'src/model/app.model';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { User, } from '@prisma/client';
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
export class UserService {
  getInvoicesSummary(status: string) {
    throw new Error('Method not implemented.');
  }
  createCheckpointAttachment(createCheckpointAttachment: CreateCheckpointAttachment) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsersByRole(role?: string): Promise<User[]> {
    // Jika role adalah 'All Roles', tidak memfilter berdasarkan role
    const whereClause =
      role && role !== 'All Roles'
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

    return this.prisma.user.update({
      where: { ID_user: id },
      data: updatedData,
    });
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
        Created_at: getAdjustedDate(), // Set creation date
        Updated_at: getAdjustedDate(), // Set updated date
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
      throw new HttpException(
        'Failed to soft delete user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}