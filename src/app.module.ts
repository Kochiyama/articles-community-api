import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './authentication/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { CommentModule } from './modules/comment/comment.module';
import { CommentLikeModule } from './modules/comment-like/comment-like.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ArticleModule,
    CommentModule,
    CommentLikeModule,
  ],
})
export class AppModule {}
