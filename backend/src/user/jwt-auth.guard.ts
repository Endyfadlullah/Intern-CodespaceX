import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly jwtService: JwtService) {
      super();
    }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
      
        if (authHeader) {
          const token = authHeader.split(' ')[1];
          try {
            const decoded = this.jwtService.verify(token);
            console.log('Decoded JWT:', decoded); // Debugging log
            if (decoded.role) {
              console.log('Role in decoded JWT:', decoded.role); // Debugging log
            } else {
              console.log('Role not found in decoded JWT'); // Debugging log
            }
            request.user = decoded; // Set user object to request
          } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
          }
        } else {
          throw new UnauthorizedException('Authorization header missing');
        }
      
        return super.canActivate(context) as Promise<boolean>;
      }
      
  }
  