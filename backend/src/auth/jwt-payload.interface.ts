// src/auth/jwt-payload.interface.ts

export interface JwtPayload {
    sub: string; // ID pengguna
    username: string; // Nama pengguna atau informasi lain yang ada di payload
    // Tambahkan properti lain jika diperlukan
  }
  