import { Prisma, User } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existentUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existentUser) {
      throw new HttpException(
        'Email already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        birthday: new Date(createUserDto.birthday),
        bio: createUserDto.bio,
        country: createUserDto.country,
        password_hash: await bcrypt.hash(createUserDto.password, 8),
      },
    });

    return user;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    return await this.prisma.user.findMany({
      ...params,
    });
  }

  async findOne(uuid: string) {
    return await this.prisma.user.findFirst({
      where: {
        uuid,
      },
    });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const existentUser = await this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    if (!existentUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.user.update({
      where: {
        uuid,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(uuid: string) {
    const existentUser = await this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    if (!existentUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.user.delete({
      where: {
        uuid,
      },
    });
  }
}
