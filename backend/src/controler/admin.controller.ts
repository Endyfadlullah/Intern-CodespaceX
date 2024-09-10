import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { DashboardService } from 'src/service/dashboard.service';
import { ProjectService } from 'src/service/project.service';
import { InvoiceService } from 'src/service/invoice.service';
import { UserService } from 'src/service/user.service';
import {
  UpdateUser,
  CreateUser,
  CreateProject,
  CreateProjectTalent,
  UpdateProject,
  CreateCheckpoint,
  UpdateCheckpoint,
  CreateCheckpointAttachment,
  CreateInvoice,
  Items_Invoice,
  UpdateCheckpointAttachment,
  UpdateInvoice
} from 'src/model/app.model';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/common/auth.decorator';

@ApiTags('Admin')
@Controller('/api/admin')
export class AdminController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly projectService: ProjectService,
    private readonly invoiceService: InvoiceService,
    private readonly userService: UserService,
  ) {}

  @Get('/dashboard/statuses')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get project status counts',
    description:
      'Fetches the count of projects for each status category including "Rejected", "In Progress", "On Going", and "Done".',
  })
  async getProjectStatusCounts() {
    try {
      return await this.dashboardService.countProjectStatuses();
    } catch (error) {
      console.error('Error fetching project status counts:', error);
      throw new HttpException(
        'Failed to fetch project status counts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('/dashboard/project')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get project dashboard',
    description:
    'Fetches detailed information about projects, including project ID, title, status, platform, and the pictures of associated talents. Optionally filters projects by status (e.g., "On Going", "In Progress", "Done"). If no status or "All" is provided, returns all projects regardless of status.',
  })
  async getProject(@Query('status') status?: string) {
    try {
      return await this.dashboardService.readProjectDashboard(status);
    } catch (error) {
      console.error('Error fetching project status counts:', error);
      throw new HttpException(
        'Failed to fetch project status counts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/dashboard/project/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get project dashboard',
    description:
    'Fetches detailed information about projects, including project ID, title, status, platform, and the pictures of associated talents. Optionally filters projects by status (e.g., "On Going", "In Progress", "Done"). If no status or "All" is provided, returns all projects regardless of status.',
  })
  async getProjectbyid(@Query('ID Project') id?: number) {
    try {
      return await this.dashboardService.readProjectDashboardDropdown(id);
    } catch (error) {
      console.error('Error fetching project status counts:', error);
      throw new HttpException(
        'Failed to fetch project status counts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the provided details.',
  })
  async createUser(@Body() createUserRequest: CreateUser) {
    try {
      return await this.userService.createUser(createUserRequest);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get users by role',
    description:
      'Fetches users based on the role. Input "All Roles" to display all users, "admin" for admin users, "talent" for talent users, or "customer" for customer users.',
  })
  async findAll(@Query('role') role?: string) {
    try {
      return await this.userService.findAllUsersByRole(role);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/users/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user details by ID',
    description: 'Fetches detailed information of a user by their ID.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.findUserById(id);
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw new HttpException(
        'Failed to fetch user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/users/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user by ID',
    description:
      'Updates user information based on the provided ID and details.',
  })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRequest: UpdateUser,
  ) {
    try {
      return await this.userService.updateUserById(id, updateUserRequest);
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw new HttpException('Failed to update user', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/users/:id/soft-delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Soft delete user by ID',
    description:
      'Soft deletes a user by their ID, marking the user as deleted but not physically removing them from the database.',
  })
  async softDeleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.softDeleteUserById(id);
    } catch (error) {
      console.error(`Error soft deleting user with ID ${id}:`, error);
      throw new HttpException(
        'Failed to soft delete user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/project')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new project',
    description: 'Creates a new project with the provided details.',
  })
  async createProject(@Body() createProjectRequest: CreateProject) {
    try {
      return await this.projectService.createProject(createProjectRequest);
    } catch (error) {
      console.error('Error creating project:', error);
      throw new HttpException(
        'Failed to create project',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/projects')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all projects',
    description: 'Fetches a list of all projects.',
  })
  async findAllProjects() {
    try {
      return await this.projectService.findAllProjects();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new HttpException(
        'Failed to fetch projects',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/project/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get project details by ID',
    description: 'Fetches detailed information of a project by its ID.',
  })
  async findProject(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectService.findProjectById(id);
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      throw new HttpException(
        'Failed to fetch project',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/project/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update project by ID',
    description:
      'Updates project information based on the provided ID and details.',
  })
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectRequest: UpdateProject,
  ) {
    try {
      return await this.projectService.updateProjectById(
        id,
        updateProjectRequest,
      );
    } catch (error) {
      console.error(`Error updating project with ID ${id}:`, error);
      throw new HttpException(
        'Failed to update project',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/project/:id/soft-delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Soft delete project by ID',
    description:
      'Soft deletes a project by its ID, marking the project as deleted but not physically removing it from the database.',
  })
  async softDeleteProject(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectService.softDeleteProjectById(id);
    } catch (error) {
      console.error(`Error soft deleting project with ID ${id}:`, error);
      throw new HttpException(
        'Failed to soft delete project',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/projecttalent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all talents',
    description: 'Fetches a list of all talents associated with projects.',
  })
  async findAlluser() {
    try {
      return await this.projectService.ReadAllTalent();
    } catch (error) {
      console.error('Error fetching project talents:', error);
      throw new HttpException(
        'Failed to fetch project talents',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/project/talent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new project talent',
    description: 'Adds a new talent to a project with the provided details.',
  })
  async createProjectTalent(@Body() createProjectTalent: CreateProjectTalent) {
    try {
      return await this.projectService.createProjectTalent(createProjectTalent);
    } catch (error) {
      console.error('Error creating project talent:', error);
      throw new HttpException(
        'Failed to create project talent',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/project/talent/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get project talent by project ID',
    description:
      'Fetches talents associated with a specific project by its ID.',
  })
  async findProjectTalent(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectService.findProjectTalentByProjectId(id);
    } catch (error) {
      console.error(`Error fetching project talent with ID ${id}:`, error);
      throw new HttpException(
        'Failed to fetch project talent',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/project/talent/:id/soft-delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Soft delete project talent by ID',
    description:
      'Soft deletes a project talent by its ID, marking the talent as deleted but not physically removing it from the database.',
  })
  async softDeleteProjectTalent(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectService.softDeleteProjectTalentById(id);
    } catch (error) {
      console.error(`Error soft deleting project talent with ID ${id}:`, error);
      throw new HttpException(
        'Failed to soft delete project talent',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/project/checkpoint')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new checkpoint',
    description: 'Creates a new checkpoint with the provided details.'
  })
  async createCheckpoint(@Body() createChekpointRequest: CreateCheckpoint) {
    try {
      return await this.projectService.createCheckpoint(createChekpointRequest);
    } catch (error) {
      console.error('Error creating chekcpoint:', error);
      throw new HttpException('Failed to create checkpoint', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/project/checkpoint/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get checkpoint by ID',
    description: 'Fetches detailed information of a checkpoint by its ID.',
  })
  async findCheckpoint(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectService.findCheckpointById(id);
    } catch (error) {
      console.error(`Error fetching project checkpoint with ID ${id}:`, error);
      throw new HttpException(
        'Failed to fetch checpoint',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/project/checkpoint/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update checkpoint by ID',
    description:
      'Updates checkpoint information based on the provided ID and details.',
  })
  async updateCheckpoint(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCheckpointRequest: UpdateCheckpoint,
  ) {
    try {
      return await this.projectService.updateCheckpointById(
        id,
        updateCheckpointRequest,
      );
    } catch (error) {
      console.error(`Error updating checkpoint with ID ${id}:`, error);
      throw new HttpException(
        'Failed to update checkpoint',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/project/checkpoint/:id/soft-delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Soft delete checkpoint by ID',
    description:
      'Soft deletes a checkpoint by its ID, marking the checkpoint as deleted but not physically removing it from the database.',
  })
  async softDeleteCheckpoint(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectService.softDeleteCheckpointById(id);
    } catch (error) {
      console.error(`Error soft deleting checkpoint with ID ${id}:`, error);
      throw new HttpException(
        'Failed to soft delete checkpoint',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/project/checkpoint/attachment')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new project checkpoint attachment',
    description: 'Adds a new attachment to a project checkpoint with the provided details.',
  })
  async createCheckpointAttachment(@Body() createCheckpointAttachment: CreateCheckpointAttachment) {
    try {
      return await this.projectService.createCheckpointAttachment(createCheckpointAttachment);
    } catch (error) {
      console.error('Error creating checkpoint attachment:', error);
      throw new HttpException(
        'Failed to create checkpoint attachment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  @Get('/project/checkpoint/attachment/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get checkpoint attachments by checkpoint ID',
    description: 'Fetches attachments associated with a specific checkpoint by its ID.',
  })
  async findCheckpointAttachments(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectService.findCheckpointAttachmentsById(id);
    } catch (error) {
      console.error(`Error fetching attachments for checkpoint with ID ${id}:`, error);
      throw new HttpException(
        'Failed to fetch checkpoint attachments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/project/checkpoint/attachment/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update checkpoint attachment by ID',
    description: 'Updates an attachment related to a specific checkpoint by its ID.',
  })
  async updateCheckpointAttachment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCheckpointAttachment: UpdateCheckpointAttachment,
  ) {
    try {
      return await this.projectService.updateCheckpointAttachmentById(
        id,
        updateCheckpointAttachment,
      );
    } catch (error) {
      console.error(`Error updating checkpoint attachment with ID ${id}:`, error);
      throw new HttpException(
        'Failed to update checkpoint attachment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/project/checkpoint/attachment/:id/soft-delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Soft delete checkpoint attachment by ID',
    description: 'Soft deletes a checkpoint attachment by its ID, marking it as deleted but not physically removing it from the database.',
  })
  async softDeleteCheckpointAttachment(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectService.softDeleteCheckpointAttachmentById(id);
    } catch (error) {
      console.error(`Error soft deleting checkpoint attachment with ID ${id}:`, error);
      throw new HttpException(
        'Failed to soft delete checkpoint attachment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/invoice')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new invoice',
    description: 'Adds a new invoice with the provided details.',
  })
  @ApiResponse({ status: 201, description: 'The invoice has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createInvoice(@Body() createInvoice: CreateInvoice) {
    try {
      return await this.invoiceService.createInvoice(createInvoice);
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw new HttpException(
        'Failed to create invoice',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('/invoice/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update an invoice',
    description: 'Updates an invoice based on the provided ID and new details.',
  })
  @ApiResponse({ status: 200, description: 'The invoice has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updateInvoice(
    @Param('id') id: string,  // Mengubah tipe menjadi string
    @Body() updateInvoiceDto: UpdateInvoice,
  ) {
    try {
      return await this.invoiceService.updateInvoiceById(id, updateInvoiceDto);
    } catch (error) {
      console.error(`Error updating invoice with ID ${id}:`, error);
      throw new HttpException('Failed to update invoice', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/invoice/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Soft delete an invoice',
    description: 'Marks an invoice as deleted without removing it from the database.',
  })
  @ApiResponse({ status: 200, description: 'The invoice has been successfully soft deleted.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  async softDeleteInvoice(@Param('id') id: string) {
    try {
      return await this.invoiceService.softDeleteInvoiceById(id);
    } catch (error) {
      console.error(`Error soft deleting invoice with ID ${id}:`, error);
      throw new HttpException('Failed to soft delete invoice', HttpStatus.NOT_FOUND);
    }
  }

  @Post('/invoice/items')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new invoice',
    description: 'Adds a new invoice with the provided details.',
  })
  @ApiResponse({ status: 201, description: 'The invoice has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createInvoiceItems(@Body() Items_Invoice: Items_Invoice) {
    try {
      return await this.invoiceService.createItemsInvoice(Items_Invoice);
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw new HttpException(
        'Failed to create invoice',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/invoice')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Read Invoice',
    description: 'Retrieves a summary of invoices filtered by the specified status. Status options are All, Draft, Paid, Sent, and OnHold.',
  })
  async getInvoicesSummary(@Query('status') status: 'All' | 'Draft' | 'Paid' | 'Sent' | 'OnHold') {
    return this.invoiceService.getInvoicesSummary(status);
  }


  @Get('/invoice/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Read Invoice by id',
    description: '',
  })
  async readinvocebyid(@Param('id') id: string) {
    try {
      const invoice = await this.invoiceService.findInvoiceById(id);
      if (!invoice) {
        throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
      }
      return invoice;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve invoice',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

}

