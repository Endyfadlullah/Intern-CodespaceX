import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import {
    LoginUserRequest,
    RegisterUserRequest,
    UpdateUserRequest,
    UserResponse,
  } from 'src/model/user.model';
  import { WebResponse } from 'src/model/web.model';
  import { Auth, Roles } from 'src/conmmon/auth.decorator';
  import { User } from '@prisma/client';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { JwtAuthGuard } from './jwt-auth.guard'; // Import JwtAuthGuard
  import { RolesGuard } from './roles.guard';
  
  @ApiTags('AUTH')
  @Controller('/api')
  export class UserController {
    constructor(private userService: UserService) {}
  
    @Post('/register/')
    @HttpCode(HttpStatus.CREATED) // Menggunakan status code 201 Created
    async register(
      @Body() request: RegisterUserRequest,
    ): Promise<WebResponse<UserResponse>> {
      try {
        console.log('Register request:', request); // Debugging log
        const result = await this.userService.register(request);
        return {
          data: result,
        };
      } catch (error) {
        console.error('Registration error:', error); // Debugging log
        throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
      }
    }
  
    @Post('/login')
    @HttpCode(HttpStatus.OK) // Status code 200 OK
    async login(
      @Body() request: LoginUserRequest,
    ): Promise<WebResponse<UserResponse>> {
      try {
        console.log('Login request:', request); // Debugging log
        const result = await this.userService.login(request);
        return {
          data: result,
        };
      } catch (error) {
        console.error('Login error:', error); // Debugging log
        throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
      }
    }
  
    @Get('/user')
  @UseGuards(JwtAuthGuard) // Menggunakan JwtAuthGuard untuk melindungi route ini
//   @Roles('admin')
  @HttpCode(HttpStatus.OK) // Status code 200 OK
  @ApiBearerAuth() // Untuk dokumentasi Swagger
  async get(): Promise<WebResponse<UserResponse[]>> {
    try {
      console.log('Get current user request'); // Debugging log
      const result = await this.userService.getUsers();
      return {
        data: result,
      };
    } catch (error) {
      console.error('Get current user error:', error); // Debugging log
      throw new HttpException(
        'Failed to retrieve user',
        HttpStatus.INTERNAL_SERVER_ERROR, // Ganti status code jika perlu
      );
    }
  }
  
    @Patch('/forget-password')
    @UseGuards(JwtAuthGuard) // Menggunakan JwtAuthGuard untuk melindungi route ini
    @HttpCode(HttpStatus.OK) // Status code 200 OK
    @ApiBearerAuth() // Untuk dokumentasi Swagger
    async update(
      @Auth() user: User,
      @Body() request: UpdateUserRequest,
    ): Promise<WebResponse<UserResponse>> {
      try {
        console.log('Update request:', request); // Debugging log
        const result = await this.userService.update(user, request);
        return {
          data: result,
        };
      } catch (error) {
        console.error('Update error:', error); // Debugging log
        throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);
      }
    }
  
    // @Delete('/logout')
    @UseGuards(JwtAuthGuard) // Menggunakan JwtAuthGuard untuk melindungi route ini
    @HttpCode(HttpStatus.NO_CONTENT) // Status code 204 No Content
    @ApiBearerAuth() // Untuk dokumentasi Swagger
    async logout(@Auth() user: User): Promise<WebResponse<boolean>> {
      try {
        console.log('Logout request:', user); // Debugging log
        await this.userService.logout(user);
        return {
          data: true,
        };
      } catch (error) {
        console.error('Logout error:', error); // Debugging log
        throw new HttpException('Logout failed', HttpStatus.BAD_REQUEST);
      }
    }
  }
  

  