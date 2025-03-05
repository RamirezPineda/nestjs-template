import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import type { QueryDto } from '@/common/dto/query.dto';
import type { ResponseMessage } from '@/common/interfaces/response-message.interface';
import { convertToQuery } from '@/common/utils/convert-to-query.utils';
import { excludeAttributes } from '@/common/utils/exclude-attributes.utils';
import { handlerError } from '@/common/utils/handler-error.utils';

import type { CreateUserDto } from '@/users/dto/create-user.dto';
import type { UpdateUserDto } from '@/users/dto/update-user.dto';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  public async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'> | undefined> {
    try {
      const { email, password } = createUserDto;
      const existUser = await this.userRepository.exists({ where: { email } });
      if (existUser)
        throw new ConflictException('There is already a user with that email');

      const saltRounds = Number(this.configService.get<number>('SALT_ROUNDS'));
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const newUser = await this.userRepository.save({
        ...createUserDto,
        password: passwordHash,
      });
      const user: Omit<User, 'password'> = excludeAttributes(newUser, [
        'password',
      ]);

      return user;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findAll(
    queryDto: QueryDto,
  ): Promise<ResponseMessage<User[]> | undefined> {
    try {
      const query = convertToQuery(queryDto);
      console.log('query: ', query);

      const users = await this.userRepository.find(query);
      const total = await this.userRepository.count();

      return { total, data: users, statusCode: 200 };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOne(id: string): Promise<User | undefined> {
    try {
      const userFound = await this.userRepository.findOneBy({ id });
      if (!userFound) throw new NotFoundException('User not found');
      return userFound;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      console.log('updateUserDto: ', updateUserDto);
      return await this.findOne(id);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }
}
