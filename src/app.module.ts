import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './authentication/auth.module';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [UserModule, AuthModule, ArticleModule],
})
export class AppModule {}
