import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z
      .string()
      .min(1, { message: 'Email tidak boleh kosong' })
      .max(100, { message: 'Email terlalu panjang' })
      .email({ message: 'Format email tidak valid' })
      .regex(/@gmail\.com$/, {
        message: 'Email harus menggunakan domain @gmail.com',
      }),
    password: z
      .string()
      .min(8, { message: 'Password harus minimal 8 karakter' })
      .regex(/[A-Z]/, { message: 'Password harus memiliki huruf besar' })
      .regex(/\d/, { message: 'Password harus memiliki angka' })
      .max(100),
    username: z.string().min(1).max(100),
  });
  static readonly LOGIN: ZodType = z.object({
    email: z
      .string()
      .min(1, { message: 'Email tidak boleh kosong' })
      .max(100, { message: 'Email terlalu panjang' })
      .email({ message: 'Format email tidak valid' })
      .regex(/@gmail\.com$/, {
        message: 'Email harus menggunakan domain @gmail.com',
      }),
    password: z
      .string()
      .min(8, { message: 'Password harus minimal 8 karakter' })
      .regex(/[A-Z]/, { message: 'Password harus memiliki huruf besar' })
      .regex(/\d/, { message: 'Password harus memiliki angka' })
      .max(100),
  });
  static readonly UPDATE: ZodType = z.object({
    username: z.string().min(1).max(100).optional(),
    password: z
      .string()
      .min(8, { message: 'Password harus minimal 8 karakter' })
      .regex(/[A-Z]/, { message: 'Password harus memiliki huruf besar' })
      .regex(/\d/, { message: 'Password harus memiliki angka' })
      .max(100)
      .optional(),
  });
  static readonly FORGOT_PASSWORD = z.object({
    email: z
      .string()
      .min(1, { message: 'Email tidak boleh kosong' })
      .max(100, { message: 'Email terlalu panjang' })
      .email({ message: 'Format email tidak valid' }),
  });

  static readonly RESET_PASSWORD = z.object({
    token: z.string().min(1, { message: 'Token tidak boleh kosong' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password harus minimal 8 karakter' })
      .regex(/[A-Z]/, { message: 'Password harus memiliki huruf besar' })
      .regex(/\d/, { message: 'Password harus memiliki angka' })
      .max(100),
  });
}
