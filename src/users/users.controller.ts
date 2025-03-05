import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { AttrTypeEnum, OrderEnum } from '@/common/interfaces/query.interface';
import { QueryDto } from '@/common/dto/query.dto';
import type { ResponseMessage } from '@/common/interfaces/response-message.interface';

import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import type { User } from '@/users/entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseMessage<Omit<User, 'password'>>> {
    const newUser = await this.usersService.create(createUserDto);
    return { statusCode: 201, data: newUser };
  }

  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'order', enum: OrderEnum, required: false })
  @ApiQuery({ name: 'attr', type: 'string', required: false })
  @ApiQuery({ name: 'attrType', enum: AttrTypeEnum, required: false })
  @ApiQuery({ name: 'value', type: 'string', required: false })
  @Get()
  async findAll(@Query() queryDto: QueryDto): Promise<ResponseMessage<User[]>> {
    const response = await this.usersService.findAll(queryDto);
    return {
      statusCode: 200,
      total: response?.total,
      data: response?.data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseMessage<User>> {
    const user = await this.usersService.findOne(id);
    return { statusCode: 200, data: user };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseMessage<User>> {
    const userUpdated = await this.usersService.update(id, updateUserDto);
    return { statusCode: 200, data: userUpdated };
  }
}
