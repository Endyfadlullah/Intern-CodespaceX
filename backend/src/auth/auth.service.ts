// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface'; // Pastikan path-nya benar

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: any) {
    const payload: JwtPayload = { sub: user.userId, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
