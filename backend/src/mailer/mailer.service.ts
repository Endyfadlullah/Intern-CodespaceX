import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CustomMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordEmail(email: string, token: string) {
    const resetPasswordUrl = `${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      text: `Anda telah meminta untuk mereset password. Klik tautan berikut untuk mereset password Anda: ${resetPasswordUrl}`, // Mengirim email dalam format teks biasa
      html: `<p>Anda telah meminta untuk mereset password.</p><p>Copy kode OTP untuk mereset password:</p><a href="${resetPasswordUrl}">${resetPasswordUrl}</a>`, // Mengirim email dalam format HTML
    });
  }
}
