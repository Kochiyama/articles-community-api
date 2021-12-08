import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';

@Injectable()
export class CommentLikeService {
  constructor(private prisma: PrismaService) {}

  async create(uuid: string, createCommentLikeDto: CreateCommentLikeDto) {
    const existentCommentLike = await this.prisma.commentLike.findFirst({
      where: {
        user_uuid: uuid,
        comment_uuid: createCommentLikeDto.comment_uuid,
      },
    });

    if (existentCommentLike) {
      throw new HttpException('Like already exists', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.commentLike.create({
      data: {
        user_uuid: uuid,
        comment_uuid: createCommentLikeDto.comment_uuid,
      },
    });
  }

  async remove(user_uuid: string, uuid: string) {
    const existentCommentLike = await this.prisma.commentLike.findFirst({
      where: {
        user_uuid,
        comment_uuid: uuid,
      },
    });

    if (!existentCommentLike) {
      throw new HttpException('Like not found', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.commentLike.delete({
      where: { uuid: existentCommentLike.uuid },
    });
  }
}
