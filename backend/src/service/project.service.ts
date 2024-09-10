import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateProject,
  CreateProjectTalent,
  UpdateProject,
  CreateCheckpointAttachment,
  CreateCheckpoint,
  UpdateCheckpoint,
  UpdateCheckpointAttachment,
} from 'src/model/app.model';
import { PrismaService } from 'src/common/prisma.service';
import { User, Project, Project_Talent, Project_Checkpoint, Project_Checkpoint_Attachment,} from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


dayjs.extend(utc);
dayjs.extend(timezone);

function getAdjustedDate(): Date {
  // Get current date and time
  const currentDate = new Date();

  // Calculate timezone offset in milliseconds (Asia/Jakarta is UTC+7)
  const timezoneOffsetMillis = 7 * 60 * 60 * 1000; // 7 hours in milliseconds

  // Adjust current date to Asia/Jakarta timezone
  const adjustedDate = new Date(currentDate.getTime() + timezoneOffsetMillis);

  return adjustedDate;
}

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) { }

    async ReadAllTalent(): Promise<User[]> {
        return this.prisma.user.findMany({
          where: {
            Role: 'talent',
            Deleted_at: null,
          },
        });
      }
    
      async createProject(createProjectDto: CreateProject): Promise<Project> {
        // Periksa apakah proyek dengan judul yang sama sudah ada
        const existingProject = await this.prisma.project.findFirst({
          where: { Project_title: createProjectDto.project_title },
        });
    
        if (existingProject) {
          throw new HttpException(
            'Project title already in use',
            HttpStatus.BAD_REQUEST,
          );
        }
    
        // Buat proyek baru
        const newProject = await this.prisma.project.create({
          data: {
            Project_title: createProjectDto.project_title,
            Platform: createProjectDto.platform,
            Deadline: new Date(createProjectDto.deadline), // Konversi string ke Date
            Status: createProjectDto.status,
            Image: createProjectDto.image,
            user: { connect: { ID_user: createProjectDto.userId } },
            Created_at: getAdjustedDate(), // Set creation date
            Updated_at: getAdjustedDate(), // Set updated date
          },
        });
    
        return newProject;
      }
    
      async createProjectTalent(
        createProjectTalent: CreateProjectTalent,
      ): Promise<Project_Talent> {
        const { ID_project, ID_user } = createProjectTalent;
    
        return this.prisma.project_Talent.create({
          data: {
            ID_project,
            ID_user,
          },
        });
      }
    
      async findAllProjects() {
        return this.prisma.project.findMany({
          where: {
            Deleted_at: null,
          },
        });
      }
    
      async findProjectById(id: number) {
        return this.prisma.project.findUnique({
          where: { ID_project: id },
          select: {
            ID_project: true,
            ID_user: true,
            user: {
              select: {
                Username: true,
                Picture: true,
              },
            },
            Image: true,
            Project_title: true,
            Platform: true,
            Deadline: true,
            Status: true,
          },
        });
      }
    
      async updateProjectById(id: number, data: UpdateProject): Promise<Project> {
        // Prepare the updated data
        const updatedData: Partial<Project> = {};
    
        if (data.ID_user !== undefined) {
          updatedData.ID_user = data.ID_user;
        }
    
        if (data.Image) {
          updatedData.Image = data.Image;
        }
    
        if (data.Project_title) {
          updatedData.Project_title = data.Project_title;
        }
    
        if (data.Platform) {
          updatedData.Platform = data.Platform;
        }
    
        if (data.Deadline) {
          updatedData.Deadline = new Date(data.Deadline);
        }
    
        if (data.Status) {
          updatedData.Status = data.Status;
        }
    
        updatedData.Updated_at = getAdjustedDate(); // Use your function to set the current date and time
    
        return this.prisma.project.update({
          where: { ID_project: id },
          data: updatedData,
        });
      }
    
      async softDeleteProjectById(id: number) {
        const user = await this.prisma.project.findUnique({
          where: { ID_project: id },
        });
    
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        try {
          return await this.prisma.project.update({
            where: { ID_project: id },
            data: {
              Deleted_at: getAdjustedDate(),
            },
          });
        } catch (error) {
          throw new HttpException(
            'Failed to soft delete user',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    
      async findProjectTalentByProjectId(projectId: number) {
        // Fetch Project_Talent records where the ID_project matches
        const projectTalents = await this.prisma.project_Talent.findMany({
          where: { ID_project: projectId, Deleted_at: null },
          include: {
            user: true, // Include the related User data
          },
        });
    
        if (projectTalents.length === 0) {
          throw new Error(
            'No ProjectTalent records found for the given Project ID',
          );
        }
    
        // Map and customize the response
        return projectTalents.map((pt) => ({
          ID_talent: pt.ID_talent,
          ID_project: pt.ID_project,
          ID_user: pt.ID_user,
          user: {
            Username: pt.user.Username,
            Picture: pt.user.Picture,
            Position: pt.user.Position,
            Role: pt.user.Role,
          },
        }));
      }
    
      async softDeleteProjectTalentById(id: number) {
        // Find the Project_Talent record by ID
        const projectTalent = await this.prisma.project_Talent.findUnique({
          where: { ID_talent: id },
        });
    
        // Check if the record exists
        if (!projectTalent) {
          throw new Error('ProjectTalent not found');
        }
    
        // Update the record to set Deleted_at field to the current date and time
        return this.prisma.project_Talent.update({
          where: { ID_talent: id },
          data: {
            Deleted_at: new Date(), // Set Deleted_at to the current date and time
          },
        });
      }

      async createCheckpoint(createCheckpointDto: CreateCheckpoint): Promise<Project_Checkpoint> {
    
        // Buat proyek baru
        const newCheckpoint = await this.prisma.project_Checkpoint.create({
          data: {
            Checkpoint_title: createCheckpointDto.checkpoint_title,
            Description: createCheckpointDto.description,
            project: { connect: { ID_project: createCheckpointDto.projectId } }, 
            Created_at: getAdjustedDate(),  // Set creation date
            Updated_at: getAdjustedDate(),  // Set updated date
          },
        });
      
        return newCheckpoint;
      }
    
      async findCheckpointById(id: number) {
        return this.prisma.project_Checkpoint.findMany({
          where: { ID_project: id },
          select: {
            ID_checkpoint: true,
            Checkpoint_title: true,
            Description: true,
            project: {
              select: {
                ID_project: true,
                Project_title: true,
              },
            },
          },
        });
      }
    
      async updateCheckpointById(id: number, data: UpdateCheckpoint): Promise<Project_Checkpoint> {
        // Prepare the updated data
        const updatedData: Partial<Project_Checkpoint> = {};
      
        if (data.ID_project !== undefined) {
          updatedData.ID_project = data.ID_project;
        }
      
        if (data.Checkpoint_title) {
          updatedData.Checkpoint_title = data.Checkpoint_title;
        }
      
        if (data.Description) {
          updatedData.Description = data.Description;
        }
      
        updatedData.Updated_at = getAdjustedDate(); // Gunakan fungsi Anda untuk mengatur waktu saat ini
      
        return this.prisma.project_Checkpoint.update({
          where: { ID_checkpoint: id },
          data: updatedData,
        });
      }
    
    async softDeleteCheckpointById(id: number) {
      const checkpoint = await this.prisma.project_Checkpoint.findUnique({
        where: { ID_checkpoint: id },
      });
    
      if (!checkpoint) {
        throw new HttpException('Checkpoint not found', HttpStatus.NOT_FOUND);
      }
    
      try {
        return await this.prisma.project_Checkpoint.update({
          where: { ID_checkpoint: id },
          data: {
            Deleted_at: getAdjustedDate(),
          },
        });
      } catch (error) {
        throw new HttpException(
          'Failed to soft delete checkpoint',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
      
      async createCheckpointAttachment(createCheckpointAttachment: CreateCheckpointAttachment): Promise<Project_Checkpoint_Attachment> {
        const { ID_checkpoint } = createCheckpointAttachment;
    
        return this.prisma.project_Checkpoint_Attachment.create({
          data: {
            Url: createCheckpointAttachment.url,
            ID_checkpoint,
          },
        });
      }
    
      async updateCheckpointAttachmentById(
        id: number,
        updateCheckpointAttachment: UpdateCheckpointAttachment,
      ): Promise<Project_Checkpoint_Attachment> {
        const { ID_checkpoint, url } = updateCheckpointAttachment;
      
        // Prepare the updated data object
        const updatedData: Partial<Project_Checkpoint_Attachment> = {};
      
        if (ID_checkpoint !== undefined) {
          updatedData.ID_checkpoint = ID_checkpoint;
        }
      
        if (url !== undefined) {
          updatedData.Url = url;
        }
      
        updatedData.Updated_at = new Date(); // Set updated timestamp
      
        // Update the checkpoint attachment in the database
        return this.prisma.project_Checkpoint_Attachment.update({
          where: { ID_attachment: id },
          data: updatedData,
        });
      }
      
    
      async findCheckpointAttachmentsById(checkpointId: number) {
        // Fetch Project_Checkpoint_Attachment records where the ID_checkpoint matches
        const checkpointAttachments = await this.prisma.project_Checkpoint_Attachment.findMany({
          where: { ID_checkpoint: checkpointId, Deleted_at: null },
        });
      
        if (checkpointAttachments.length === 0) {
          throw new Error(
            'No CheckpointAttachment records found for the given Checkpoint ID',
          );
        }
      
        // Map and customize the response
        return checkpointAttachments.map((attachment) => ({
          ID_attachment: attachment.ID_attachment,
          ID_checkpoint: attachment.ID_checkpoint,
          Url: attachment.Url,
          Created_at: attachment.Created_at,
          Updated_at: attachment.Updated_at,
        }));
      }
      
      async softDeleteCheckpointAttachmentById(id: number) {
        // Find the Project_Checkpoint_Attachment record by ID
        const checkpointAttachment = await this.prisma.project_Checkpoint_Attachment.findUnique({
          where: { ID_attachment: id },
        });
      
        // Check if the record exists
        if (!checkpointAttachment) {
          throw new Error('CheckpointAttachment not found');
        }
      
        // Update the record to set Deleted_at field to the current date and time
        return this.prisma.project_Checkpoint_Attachment.update({
          where: { ID_attachment: id },
          data: {
            Deleted_at: new Date(), // Set Deleted_at to the current date and time
          },
        });
      }  
}