import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequest {
    @ApiProperty({
        description: 'The username of the user',
        example: 'username123',
      })
      username: string;
      
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password123',
  })
  password: string;
}

export class UserResponse {
    @ApiProperty({
      description: 'The email of the user',
      example: 'user@example.com',
    })
    email: string;
  
    @ApiProperty({
      description: 'The username of the user',
      example: 'username123',
    })
    username: string;
  
    @ApiProperty({
      description: 'The authentication token of the user',
      example: 'some.jwt.token',
      required: false,
    })
    token?: string;
  
    @ApiProperty({
      description: 'The mobile number of the user',
      example: '+1234567890',
      required: false,
    })
    mobile_number?: string;
  
    @ApiProperty({
      description: 'The position of the user in the company',
      example: 'Manager',
      required: false,
    })
    position?: string;
  
    @ApiProperty({
      description: 'The role of the user',
      example: 'admin',
    })
    role: string;
  
    @ApiProperty({
      description: 'The URL of the user’s profile picture',
      example: 'https://example.com/profile.jpg',
      required: false,
    })
    picture?: string;
  
    @ApiProperty({
      description: 'The status of the user account',
      example: 'active',
    })
    status: string;
  }

export class LoginUserRequest {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password123',
  })
  password: string;
}

export class UpdateUserRequest {
  @ApiProperty({
    description: 'The new username of the user',
    example: 'user@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'The new password of the user',
    example: 'NewPassword123!',
    required: false,
  })
  password?: string;
}

export class UpdateUser{
  @ApiProperty({
    description: 'The new email of the user',
    example: 'user@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'The new password of the user',
    example: 'NewPassword123!',
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: 'The new username of the user',
    example: 'new_username',
    required: false,
  })
  username?: string;

  @ApiProperty({
    description: 'The new mobile number of the user',
    example: '+6281234567890',
    required: false,
  })
  mobile_number?: string;

  @ApiProperty({
    description: 'The new position of the user',
    example: 'Manager',
    required: false,
  })
  position?: string;

  @ApiProperty({
    description: 'The new role of the user',
    example: 'admin',
    required: false,
  })
  role?: string;

  @ApiProperty({
    description: 'The new picture URL of the user',
    example: 'https://example.com/picture.jpg',
    required: false,
  })
  picture?: string;

  @ApiProperty({
    description: 'The new status of the user',
    example: 'active',
    required: false,
  })
  status?: string;
}

export class ForgotPasswordRequest {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@gmail.com',
  })
  email: string;
}

export class ForgotPasswordResponse {
  @ApiProperty({
    description: 'Indicates whether the email was successfully sent',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Message providing additional information',
    example: 'Reset password token has been sent to your email.',
  })
  message: string;
}

export class ResetPasswordRequest {
  @ApiProperty({
    description: 'Reset password token',
    example: '123456', // Token contoh 6 digit
  })
  token!: string;

  @ApiProperty({
    description: 'New password for the user',
    example: 'NewPassword123',
  })
  newPassword!: string;
}

export class ResetPasswordResponse {
  @ApiProperty({
    description: 'Indicates whether the password was successfully reset',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Message providing additional information',
    example: 'Password has been successfully reset.',
  })
  message: string;
}


export class CreateUser{
  @ApiProperty({
    description: 'The username of the user',
    example: 'username123',
  })
  username: string;
  
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password123!',
  })
  password: string;

  @ApiProperty({
    description: 'The mobile number of the user',
    example: '+6281234567890',
    required: false,
  })
  mobile_number?: string;

  @ApiProperty({
    description: 'The position of the user',
    example: 'Manager',
    required: false,
  })
  position?: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'customer',
    default: 'customer',
    required: false,
  })
  role?: string;

  @ApiProperty({
    description: 'The profile picture URL of the user',
    example: 'https://example.com/profile-picture.jpg',
    required: false,
  })
  picture?: string;

  @ApiProperty({
    description: 'The status of the user',
    example: 'active',
    default: 'active',
    required: false,
  })
  status?: string;

}

export class ReadUser{
  
}

export class CreateProject{
  @ApiProperty({
    description: 'The image of project',
    example: 'https://example.com/project-image.jpg',
    required: false,
  })
  image?: string;

  @ApiProperty({
    description: 'The project name',
    example: 'Manhattan Project',
  })
  project_title: string;
  
  @ApiProperty({
    description: 'The platform project',
    example: 'Mobile App',
    required: false,
  })
  platform: string;

  @ApiProperty({
    description: 'The mobile number of the user',
    example: '03-10-2024',
  })
  deadline?: string;

  @ApiProperty({
    description: 'The status of the project',
    example: 'On Going',
    default: 'On Going',
  })
  status: string;

  @ApiProperty({
    description: 'ID dari user',
    example: '1',
  })
  userId: number;
}

export class CreateProjectTalent {
  @ApiProperty({
    description: 'ID dari Project',
    example: '1',
  })
  ID_project: number;

  @ApiProperty({
    description: 'ID dari User dengan role Talent',
    example: '1',
  })
  ID_user: number;
}

export class UpdateProject {
  @ApiProperty({
    description: 'ID dari User yang terkait dengan Project',
    example: 1,
    required: false,
  })
  ID_user?: number;

  @ApiProperty({
    description: 'URL gambar atau logo Project',
    example: 'https://example.com/image.png',
    required: false,
  })
  Image?: string;

  @ApiProperty({
    description: 'Judul unik dari Project',
    example: 'Project Management System',
    required: false,
  })
  Project_title?: string;

  @ApiProperty({
    description: 'Platform yang digunakan untuk Project',
    example: 'Web, Mobile, Desktop',
    required: false,
  })
  Platform?: string;

  @ApiProperty({
    description: 'Deadline untuk penyelesaian Project',
    example: '2024-12-31T23:59:59Z',
    required: false,
    format: 'date-time',
  })
  Deadline?: string;

  @ApiProperty({
    description: 'Status saat ini dari Project',
    example: 'In Progress, Completed, On Hold',
    required: false,
  })
  Status?: string;
}


