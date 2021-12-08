import { Prisma, Comment } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(
    uuid: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return await this.prisma.comment.create({
      data: {
        user_uuid: uuid,
        article_uuid: createCommentDto.article_uuid,
        comment: createCommentDto.comment,
        date: new Date(),
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
  }): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      ...params,
    });
  }

  async findOne(uuid: string): Promise<Comment> {
    return await this.prisma.comment.findUnique({
      where: { uuid },
    });
  }

  async update(
    uuid: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const existentComment = await this.prisma.comment.findUnique({
      where: { uuid },
    });

    if (!existentComment) {
      throw new HttpException('Comment not found', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.comment.update({
      where: { uuid },
      data: updateCommentDto,
    });
  }

  async remove(uuid: string): Promise<Comment> {
    const existentComment = await this.prisma.comment.findUnique({
      where: { uuid },
    });

    if (!existentComment) {
      throw new HttpException('Comment not found', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.comment.delete({
      where: { uuid },
    });
  }
}
