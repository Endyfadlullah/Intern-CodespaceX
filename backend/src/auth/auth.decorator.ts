import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

// Dekorator untuk mendapatkan pengguna yang sedang diautentikasi dari request
export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('Request User:', request.user); // Debug request.user
    return request.user; // Mengembalikan user dari request
  },
);

// Dekorator untuk menetapkan peran yang diperlukan pada route
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
