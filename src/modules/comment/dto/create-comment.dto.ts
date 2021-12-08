import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  article_uuid: string;

  @IsString()
  comment: string;
}
