import {z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER : ZodType = z.object({
        email: z.string().min(1).max(100), 
        password: z.string()
        .min(8, { message: 'Password harus minimal 8 karakter' })
        .regex(/[A-Z]/, { message: 'Password harus memiliki huruf besar' })
        .regex(/\d/, { message: 'Password harus memiliki angka' })
        .max(100), 
        username: z.string().min(1).max(100), 
    })
    static readonly LOGIN : ZodType = z.object({
        email: z.string().min(1).max(100), 
        password: z.string()
        .min(8, { message: 'Password harus minimal 8 karakter' })
        .regex(/[A-Z]/, { message: 'Password harus memiliki huruf besar' })
        .regex(/\d/, { message: 'Password harus memiliki angka' })
        .max(100), 
    })
    static readonly UPDATE: ZodType = z.object({
        username: z.string().min(1).max(100).optional(),
        password: z.string()
        .min(8, { message: 'Password harus minimal 8 karakter' })
        .regex(/[A-Z]/, { message: 'Password harus memiliki huruf besar' })
        .regex(/\d/, { message: 'Password harus memiliki angka' })
        .max(100)
        .optional(),
      });
}