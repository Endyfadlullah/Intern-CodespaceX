import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequest {
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
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password123!',
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
