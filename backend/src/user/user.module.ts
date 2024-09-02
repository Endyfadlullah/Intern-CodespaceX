import { Module } from '@nestjs/common';
import { UserService, AdminService } from './user.service'; // Import AdminService
import { UserController } from '../controler/user.controller';
import { AdminController } from '../controler/admin.controller';
import { PrismaService } from 'src/conmmon/prisma.service';
import { ValidationService } from 'src/conmmon/validation.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [UserService, AdminService, PrismaService, ValidationService], // Add AdminService here
  controllers: [UserController, AdminController],
})
export class UserModule {}
