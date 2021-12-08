import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ArticleLikeService } from './article-like.service';
import { CreateArticleLikeDto } from './dto/create-article-like.dto';

@Controller('article-like')
export class ArticleLikeController {
  constructor(private readonly articleLikeService: ArticleLikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: Request,
    @Body() createArticleLikeDto: CreateArticleLikeDto,
  ) {
    return this.articleLikeService.create(
      req.user['uuid'],
      createArticleLikeDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.articleLikeService.remove(uuid);
  }
}
