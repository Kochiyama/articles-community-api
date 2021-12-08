import { Article, Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    user_uuid: string;
    title: string;
    description: string;
    content: string;
  }): Promise<Article> {
    return await this.prisma.article.create({
      data: {
        author_uuid: data.user_uuid,
        title: data.title,
        description: data.description,
        content: data.content,
        likes: 0,
        publication_date: new Date(),
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ArticleWhereUniqueInput;
    where?: Prisma.ArticleWhereInput;
    orderBy?: Prisma.ArticleOrderByWithRelationInput;
  }): Promise<Article[]> {
    return await this.prisma.article.findMany({
      ...params,
    });
  }

  async findOne(uuid: string): Promise<Article> {
    return await this.prisma.article.findUnique({
      where: {
        uuid,
      },
    });
  }

  async update(
    uuid: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    console.log(updateArticleDto);
    const existentArticle = await this.prisma.article.findUnique({
      where: { uuid },
    });

    if (!existentArticle) {
      throw new HttpException('Article not found', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.article.update({
      where: { uuid },
      data: updateArticleDto,
    });
  }

  async remove(uuid: string): Promise<Article> {
    const existentArticle = await this.prisma.article.findUnique({
      where: { uuid },
    });

    if (!existentArticle) {
      throw new HttpException('Article not found', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.article.delete({
      where: { uuid },
    });
  }
}
