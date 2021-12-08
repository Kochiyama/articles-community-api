import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateCommentLikeDto {
  @ApiProperty()
  @IsUUID()
  comment_uuid: string;
}
