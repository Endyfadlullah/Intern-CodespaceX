import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';


@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) { }


    async countProjectStatuses() {
        const statuses = ['Rejected', 'In Progress', 'On Going', 'Done'];
    
        const counts = await Promise.all(
          statuses.map(async (status) => {
            const count = await this.prisma.project.count({
              where: {
                Status: status.trim(), // Trim to handle any extra spaces
                Deleted_at: null, // Ensure deleted_at is null
              },
            });
            console.log(`Status: ${status}, Count: ${count}`);
            return { status, count };
          }),
        );
    
        return counts;
      }


    async readProjectDashboard(status?: string) {
        // Menambahkan filter status secara dinamis jika status disediakan, kecuali untuk "All"
        const query = `
          SELECT 
            project.ID_project, 
            project.Project_title, 
            project.Status, 
            project.Platform, 
            GROUP_CONCAT(user.Picture) AS Talent_Pictures, 
            project_checkpoint.Updated_at, 
            project.Deadline
          FROM Project project
          JOIN Project_Talent project_talent ON project.ID_project = project_talent.ID_project
          JOIN User user ON project_talent.ID_user = user.ID_user
          LEFT JOIN Project_Checkpoint project_checkpoint ON project.ID_project = project_checkpoint.ID_project
          WHERE user.Role = 'talent'
          ${status && status !== 'All' ? 'AND project.Status = ?' : ''}
          GROUP BY 
            project.ID_project, 
            project.Project_title, 
            project.Status, 
            project.Platform, 
            project_checkpoint.Updated_at, 
            project.Deadline;
        `;

        // Jika status adalah "All", kembalikan semua proyek tanpa filter status
        return status && status !== 'All'
            ? this.prisma.$queryRawUnsafe(query, status)
            : this.prisma.$queryRawUnsafe(query);
    }

    async readProjectDashboardDropdown(id?: number) {
        const query = `
          SELECT 
            project.ID_project, 
            project_checkpoint.ID_checkpoint,
            project.Image, 
            project_checkpoint.Checkpoint_title, 
            project_checkpoint.Description, 
            GROUP_CONCAT(project_checkpoint_attachment.Url SEPARATOR ', ') AS Attachment_Urls
          FROM Project project
          JOIN Project_Checkpoint project_checkpoint 
            ON project.ID_project = project_checkpoint.ID_project
          LEFT JOIN Project_Checkpoint_Attachment project_checkpoint_attachment 
            ON project_checkpoint.ID_checkpoint = project_checkpoint_attachment.ID_checkpoint
          JOIN (
            SELECT 
              ID_project, 
              MAX(ID_checkpoint) AS Max_ID_checkpoint
            FROM Project_Checkpoint
            GROUP BY ID_project
          ) AS max_checkpoints
            ON project_checkpoint.ID_checkpoint = max_checkpoints.Max_ID_checkpoint
            AND project_checkpoint.ID_project = max_checkpoints.ID_project
          WHERE project.ID_project = ${id}  -- Replace with parameterized query if needed
          GROUP BY 
            project.ID_project,
            project_checkpoint.ID_checkpoint,
            project.Image, 
            project_checkpoint.Checkpoint_title, 
            project_checkpoint.Description
        `;

        return this.prisma.$queryRawUnsafe(query);
    }
}