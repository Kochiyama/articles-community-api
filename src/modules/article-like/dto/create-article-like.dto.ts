import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateArticleLikeDto {
  @ApiProperty()
  @IsUUID()
  article_uuid: string;
}
