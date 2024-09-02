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