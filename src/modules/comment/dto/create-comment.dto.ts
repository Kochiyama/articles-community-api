import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsUUID()
  article_uuid: string;

  @ApiProperty()
  @IsString()
  comment: string;
}
