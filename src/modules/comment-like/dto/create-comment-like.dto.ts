import { IsUUID } from 'class-validator';

export class CreateCommentLikeDto {
  @IsUUID()
  comment_uuid: string;
}
