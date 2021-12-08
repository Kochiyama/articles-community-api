import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Req,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CommentLikeService } from './comment-like.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';

@Controller('comment-like')
export class CommentLikeController {
  constructor(private readonly commentLikeService: CommentLikeService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Req() req: Request,
    @Body() createCommentLikeDto: CreateCommentLikeDto,
  ) {
    return {
      comment_like: await this.commentLikeService.create(
        req.user['uuid'],
        createCommentLikeDto,
      ),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':uuid')
  async remove(
    @Req() req: Request,
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ) {
    return {
      deleted_comment_like: await this.commentLikeService.remove(
        req.user['uuid'],
        uuid,
      ),
    };
  }
}
