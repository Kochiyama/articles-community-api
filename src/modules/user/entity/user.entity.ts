import { User } from '.prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity {
  uuid: string;
  name: string;
  email: string;
  birthday: Date;
  bio: string;
  country: string;

  @Exclude()
  password_hash: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
