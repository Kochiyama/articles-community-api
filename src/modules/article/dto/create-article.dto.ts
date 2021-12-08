import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  content: string;
}
