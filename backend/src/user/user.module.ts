import { Module } from '@nestjs/common';
import { UserService, AdminService } from './user.service'; // Import AdminService
import { UserController } from '../controler/auth.controller';
import { AdminController } from '../controler/admin.controller';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { AuthModule } from 'src/auth/auth.module';
import { CustomMailerService } from '../mailer/mailer.service';

@Module({
  imports: [AuthModule],
  providers: [
    UserService,
    AdminService,
    PrismaService,
    ValidationService,
    CustomMailerService,
  ], // Add AdminService here
  controllers: [UserController, AdminController],
})
export class UserModule {}
