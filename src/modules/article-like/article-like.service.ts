import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateArticleLikeDto } from './dto/create-article-like.dto';

@Injectable()
export class ArticleLikeService {
  constructor(private prisma: PrismaService) {}

  async create(user_uuid: string, createArticleLikeDto: CreateArticleLikeDto) {
    const existentArticleLike = await this.prisma.articleLike.findFirst({
      where: {
        user_uuid,
        article_uuid: createArticleLikeDto.article_uuid,
      },
    });

    if (existentArticleLike) {
      throw new HttpException('Like already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.articleLike.create({
      data: {
        article_uuid: createArticleLikeDto.article_uuid,
        user_uuid: user_uuid,
      },
    });
  }

  async remove(uuid: string) {
    const existentArticleLike = await this.prisma.articleLike.findUnique({
      where: {
        uuid,
      },
    });

    if (!existentArticleLike) {
      throw new HttpException('Like not found', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.articleLike.delete({
      where: { uuid },
    });
  }
}
