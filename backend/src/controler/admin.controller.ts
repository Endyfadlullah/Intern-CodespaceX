import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Param,
  Post,  // Add Post import for creating user
  Put,
  UseGuards
} from '@nestjs/common';
import { AdminService } from '../user/user.service'; // Ensure AdminService is correctly imported
import { UpdateUser, CreateUser, CreateProject, CreateProjectTalent, UpdateProject } from 'src/model/user.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ParseIntPipe } from '@nestjs/common';
import { Roles } from 'src/conmmon/auth.decorator'; // Ensure Roles decorator is imported

@ApiTags('Admin') // Tag for admin-related routes
@Controller('/api/admin') // Base route for admin
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('/dashboard/statuses')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
async getProjectStatusCounts() {
  try {
    return await this.adminService.countProjectStatuses();
  } catch (error) {
    console.error('Error fetching project status counts:', error);
    throw new HttpException('Failed to fetch project status counts', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


  @Post('/users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async createUser(@Body() createUserRequest: CreateUser) {
    try {
      return await this.adminService.createUser(createUserRequest);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
    }
  }


  @Get('/users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async findAll(@Query('role') role?: string) {
    try {
      return await this.adminService.findAllUsersByRole(role);
    } catch (error) {
      console.error('Error fetching users:', error);
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
    @Body() updateUserRequest: UpdateUser,
  ) {
    try {
      return await this.adminService.updateUserById(id, updateUserRequest);
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw new HttpException('Failed to update user', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/users/:id/soft-delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async softDeleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.adminService.softDeleteUserById(id);
    } catch (error) {
      console.error(`Error soft deleting user with ID ${id}:`, error);
      throw new HttpException('Failed to soft delete user', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/project')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async createProject(@Body() createProjectRequest: CreateProject) {
    try {
      return await this.adminService.createProject(createProjectRequest);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/projects')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async findAllProjects() {
    try {
      return await this.adminService.findAllProjects();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new HttpException('Failed to fetch projects', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/Project/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async findProject(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.adminService.findProjectById(id);
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw new HttpException('Failed to fetch user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/Project/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectRequest: UpdateProject,
  ) {
    try {
      return await this.adminService.updateProjectById(id, updateProjectRequest);
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw new HttpException('Failed to update user', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/project/:id/soft-delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async softDeleteProject(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.adminService.softDeleteProjectById(id);
    } catch (error) {
      console.error(`Error soft deleting user with ID ${id}:`, error);
      throw new HttpException('Failed to soft delete user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/projecttalent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async findAlluser() {
    try {
      return await this.adminService.ReadAllTalent();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/project/talent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async createProjectTalent(@Body() createProjectTalent: CreateProjectTalent) {
    try {
      return await this.adminService.createProjectTalent(createProjectTalent);
    } catch (error) {
      console.error('Error creating project talent:', error);
      throw new HttpException('Failed to create project talent', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/Project/talent/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async findProjectTalent(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.adminService.findProjectTalentByProjectId(id);
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw new HttpException('Failed to fetch user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/project/talent/:id/soft-delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async softDeleteProjectTalent(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.adminService.softDeleteProjectTalentById(id);
    } catch (error) {
      console.error(`Error soft deleting user with ID ${id}:`, error);
      throw new HttpException('Failed to soft delete user', HttpStatus.BAD_REQUEST);
    }
  }


}
