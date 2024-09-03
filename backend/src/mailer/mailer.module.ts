import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          transport: {
            host: config.get('MAIL_HOST'),
            port: parseInt(config.get('MAIL_PORT')),
            secure: false,
            auth: {
              user: config.get('MAIL_USER'),
              pass: config.get('MAIL_PASS'),
            },
          },
          defaults: {
            from: `"CodeSpaceX" <${config.get('MAIL_USER')}>`,
          },
        };
      },
    }),
  ],
})
export class MailerConfigModule {}
