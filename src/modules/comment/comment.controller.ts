import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Comment } from '.prisma/client';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: Request,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<{ comment: Comment }> {
    return {
      comment: await this.commentService.create(
        req.user['uuid'],
        createCommentDto,
      ),
    };
  }

  @Get()
  async findAll(): Promise<{ comments: Comment[] }> {
    return {
      comments: await this.commentService.findAll({}),
    };
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<{ comment: Comment }> {
    return {
      comment: await this.commentService.findOne(uuid),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<{ updated_comment: Comment }> {
    return {
      updated_comment: await this.commentService.update(uuid, updateCommentDto),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  async remove(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<{ deleted_comment: Comment }> {
    return {
      deleted_comment: await this.commentService.remove(uuid),
    };
  }
}
