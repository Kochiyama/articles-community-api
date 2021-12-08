import { IsUUID } from 'class-validator';

export class CreateArticleLikeDto {
  @IsUUID()
  article_uuid: string;
}
