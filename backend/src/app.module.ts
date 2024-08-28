import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CommonModule } from './conmmon/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module'; 

@Module({
  imports: [CommonModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
