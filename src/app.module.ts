import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './authentication/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [UserModule, AuthModule, ArticleModule, CommentModule],
})
export class AppModule {}
