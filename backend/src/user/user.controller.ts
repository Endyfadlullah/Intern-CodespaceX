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
  UseGuards 
} from '@nestjs/common';
import { UserService, AdminService } from './user.service';
import { 
  LoginUserRequest, 
  RegisterUserRequest, 
  UpdateUserRequest, 
  UserResponse 
} from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { Auth, Roles } from 'src/conmmon/auth.decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ParseIntPipe } from '@nestjs/common';

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

  @Patch('/forget-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  async update(
    @Auth() user: User,
    @Body() request: UpdateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    try {
      console.log('Update request:', request);
      const result = await this.userService.update(user, request);
      return { data: result };
    } catch (error) {
      console.error('Update error:', error);
      throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);
    }
  }

}
