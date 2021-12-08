import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDateString()
  birthday: Date;

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  password: string;
}
