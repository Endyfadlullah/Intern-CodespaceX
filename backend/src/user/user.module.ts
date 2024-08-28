import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/conmmon/prisma.service';
import { ValidationService } from 'src/conmmon/validation.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [UserService, PrismaService, ValidationService],
  controllers: [UserController],
})
export class UserModule {}
