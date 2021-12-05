import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
