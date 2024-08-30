import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    HttpException, 
    HttpStatus, 
    Param, 
    Put, 
    UseGuards 
  } from '@nestjs/common';
  import { AdminService } from './user.service'; // Make sure AdminService is correctly imported
  import { UpdateUserRequest } from 'src/model/user.model';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../auth/roles.guard';
  import { ParseIntPipe } from '@nestjs/common';
  import { Roles } from 'src/conmmon/auth.decorator'; // Ensure Roles decorator is imported
  
  @ApiTags('Admin') // Tag for admin-related routes
  @Controller('/api/admin') // Base route for admin
  export class AdminController {
    constructor(private readonly adminService: AdminService) {}
  
    @Get('/users')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    async findAll() {
      try {
        return await this.adminService.findAllUsers();
      } catch (error) {
        console.error('Error fetching all users:', error);
        throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get('/users/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    async findOne(@Param('id', ParseIntPipe) id: number) {
      try {
        return await this.adminService.findUserById(id);
      } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw new HttpException('Failed to fetch user', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Put('/users/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    async updateUser(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserRequest: UpdateUserRequest,
    ) {
      try {
        return await this.adminService.updateUserById(id, updateUserRequest);
      } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw new HttpException('Failed to update user', HttpStatus.BAD_REQUEST);
      }
    }
  
    @Delete('/users/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    async remove(@Param('id', ParseIntPipe) id: number) {
      try {
        return await this.adminService.deleteUserById(id);
      } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw new HttpException('Failed to delete user', HttpStatus.BAD_REQUEST);
      }
    }
  }
  