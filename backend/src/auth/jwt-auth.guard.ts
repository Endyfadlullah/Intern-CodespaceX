import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Pertama, pastikan token valid dengan memanggil `super.canActivate`
    const canActivate = (await super.canActivate(context)) as boolean;

    // Jika token tidak valid, lemparkan UnauthorizedException
    if (!canActivate) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    // Jika token valid, ekstrak payload dan tambahkan ke `request.user`
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (token) {
      const user = this.jwtService.decode(token) as any; // Extract user data from JWT
      request.user = user;
    }

    return true;
  }

  private extractTokenFromHeader(request): string | null {
    const headers = request.headers;
    return headers.authorization ? headers.authorization.replace('Bearer ', '') : null;
  }
}


