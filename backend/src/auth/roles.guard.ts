import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator'; // Pastikan path-nya benar

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    
    // Jika tidak ada role yang ditetapkan, akses ditolak
    if (!roles || roles.length === 0) {
      throw new ForbiddenException('Access denied');
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Pastikan pengguna terautentikasi dan memiliki role yang sesuai
    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenException('Access denied: You do not have the required role');
    }

    return true;
  }
}
