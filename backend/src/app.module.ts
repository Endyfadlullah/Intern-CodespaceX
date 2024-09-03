import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfigModule } from './mailer/mailer.module'; 
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerConfigModule,
    UserModule,
    CommonModule,
  ],
})
export class AppModule {}
