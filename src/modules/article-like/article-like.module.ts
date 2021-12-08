import { Module } from '@nestjs/common';
import { ArticleLikeService } from './article-like.service';
import { ArticleLikeController } from './article-like.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArticleLikeController],
  providers: [ArticleLikeService],
})
export class ArticleLikeModule {}
