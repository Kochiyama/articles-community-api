import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Req() request: Request,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return {
      article: await this.articleService.create({
        ...createArticleDto,
        user_uuid: request.user['uuid'],
      }),
    };
  }

  @Get()
  async findAll() {
    return {
      articles: await this.articleService.findAll({}),
    };
  }

  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return {
      article: await this.articleService.findOne(uuid),
    };
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return {
      updated_article: await this.articleService.update(uuid, updateArticleDto),
    };
  }

  @Delete(':uuid')
  async remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return {
      deleted_article: await this.articleService.remove(uuid),
    };
  }
}
