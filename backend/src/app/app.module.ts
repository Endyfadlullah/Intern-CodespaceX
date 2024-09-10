import { Module } from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';
import { DashboardService } from 'src/service/dashboard.service';
import { ProjectService } from 'src/service/project.service';
import { InvoiceService } from 'src/service/invoice.service';
import { UserService } from 'src/service/user.service';
import { UserController } from '../controler/auth.controller';
import { AdminController } from '../controler/admin.controller';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { AuthModule } from 'src/auth/auth.module';
import { CustomMailerService } from '../mailer/mailer.service';

@Module({
  imports: [AuthModule],
  providers: [
    AuthService,
    DashboardService,
    ProjectService,
    InvoiceService,
    UserService,
    PrismaService,
    ValidationService,
    CustomMailerService,
  ], // Add AdminService here
  controllers: [UserController, AdminController],
})
export class UserModule {}
