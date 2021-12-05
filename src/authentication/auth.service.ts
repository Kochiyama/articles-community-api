import { User } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password_hash'>> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const passwordsMatch = await bcrypt.compare(password, user.password_hash);

    if (passwordsMatch) {
      delete user.password_hash;
      return user;
    }

    throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
  }

  async generateToken(
    user: Omit<User, 'password_hash'>,
  ): Promise<{ access_token: string }> {
    const payload: JwtPayload = { email: user.email, uuid: user.uuid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
