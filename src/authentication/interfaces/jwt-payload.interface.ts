import { IsEmail, IsUUID } from 'class-validator';

export class JwtPayload {
  @IsUUID()
  uuid: string;

  @IsEmail()
  email: string;
}
