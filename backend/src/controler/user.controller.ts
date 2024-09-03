import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService, AdminService } from '../user/user.service';
import {
  ForgotPasswordResponse,
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  ResetPasswordResponse,
  UserResponse,
} from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { Auth, Roles } from 'src/common/auth.decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ParseIntPipe } from '@nestjs/common';
import {
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../model/user.model';

@ApiTags('AUTH') // Tag for user-related routes
@Controller('/api')
export class UserController {
  constructor(
    private userService: UserService,
    private adminService: AdminService, // Inject AdminService
  ) {}

  // User routes
  @Post('/register/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Registers a new user with the provided registration details.',
  })
  async register(
    @Body() request: RegisterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    try {
      console.log('Register request:', request);
      const result = await this.userService.register(request);
      return { data: result };
    } catch (error) {
      console.error('Registration error:', error);
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login a user',
    description:
      'Authenticates a user with the provided login credentials and returns a token.',
  })
  async login(
    @Body() request: LoginUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    try {
      console.log('Login request:', request);
      const result = await this.userService.login(request);
      return { data: result };
    } catch (error) {
      console.error('Login error:', error);
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Forgot password - send reset token' })
  @ApiBody({ type: ForgotPasswordRequest })
  async forgotPassword(
    @Body() request: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    try {
      await this.userService.forgotPassword(request.email);
      return {
        success: true,
        message: 'Reset password token has been sent to your email.',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Reset password using token' })
  @ApiBody({ type: ResetPasswordRequest })
  async resetPassword(
    @Body() request: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
    try {
      await this.userService.resetPassword(request.token, request.newPassword);
      return {
        success: true,
        message: 'Password has been successfully reset.',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
