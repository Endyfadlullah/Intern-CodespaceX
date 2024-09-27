import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfigModule } from './mailer/mailer.module'; 
import { UserModule } from './app/app.module';
import { CommonModule } from './common/common.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerConfigModule,
    UserModule,
    CommonModule,
    InvoiceModule,
  ],
})
export class AppModule {}
