import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ArticleLikeService } from './article-like.service';
import { CreateArticleLikeDto } from './dto/create-article-like.dto';

@Controller('article-like')
export class ArticleLikeController {
  constructor(private readonly articleLikeService: ArticleLikeService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Req() req: Request,
    @Body() createArticleLikeDto: CreateArticleLikeDto,
  ) {
    return {
      article_like: await this.articleLikeService.create(
        req.user['uuid'],
        createArticleLikeDto,
      ),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':uuid')
  async remove(@Req() req: Request, @Param('uuid') uuid: string) {
    return {
      deleted_article_like: await this.articleLikeService.remove(
        req.user['uuid'],
        uuid,
      ),
    };
  }
}
