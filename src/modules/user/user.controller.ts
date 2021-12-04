import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '.prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password_hash'>> {
    const user = await this.userService.create(createUserDto);
    delete user.password_hash;
    return user;
  }

  @Get()
  async findAll(): Promise<Omit<User, 'password_hash'>[]> {
    const users = await this.userService.findAll({});
    users.map((user) => {
      delete user.password_hash;
      return user;
    });
    return users;
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<Omit<User, 'password_hash'>> {
    const user = await this.userService.findOne(uuid);
    delete user.password_hash;
    return user;
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password_hash'>> {
    const user = await this.userService.update(uuid, updateUserDto);
    delete user.password_hash;
    return user;
  }

  @Delete(':uuid')
  async remove(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<Omit<User, 'password_hash'>> {
    const user = await this.userService.remove(uuid);
    delete user.password_hash;
    return user;
  }
}
