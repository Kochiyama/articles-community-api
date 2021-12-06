import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateArticleDto {
  @IsUUID()
  author_uuid: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsNumber()
  likes: number;

  @IsDateString()
  publication_date: Date;
}
