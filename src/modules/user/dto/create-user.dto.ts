import { IsDateString, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthday: Date;

  @IsString()
  bio: string;

  @IsString()
  country: string;

  @IsString()
  password: string;
}
