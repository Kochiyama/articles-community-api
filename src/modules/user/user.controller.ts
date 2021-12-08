import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserEntity } from './entity/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: UserEntity }> {
    const user = await this.userService.create(createUserDto);
    return {
      user: new UserEntity(user),
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<{ users: UserEntity[] }> {
    const users = await this.userService.findAll({});
    const serializedUsers: UserEntity[] = users.map((user) => {
      return new UserEntity(user);
    });

    return {
      users: serializedUsers,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<{ user: UserEntity }> {
    const user = await this.userService.findOne(uuid);
    return {
      user: new UserEntity(user),
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ updated_user: UserEntity }> {
    const user = await this.userService.update(uuid, updateUserDto);
    return {
      updated_user: new UserEntity(user),
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':uuid')
  async remove(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<{ deleted_user: UserEntity }> {
    const user = await this.userService.remove(uuid);
    return {
      deleted_user: new UserEntity(user),
    };
  }
}
