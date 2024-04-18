import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  MsgResponse,
  MultipleObjectsResponse,
  SingleObjectResponse,
} from 'src/common/responses.common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { TryCatchError } from 'src/common/errors/try-catch.errors';
import { RepositoryQuery } from 'src/common/queries/repository-query.queries';
import { Pagination } from 'src/common/pagination/pagination';
@Injectable()
export class UsersService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<MsgResponse> {
    try {
      const hashedPassword = await hash(
        createUserDto.password,
        Number(process.env.BYCRYPT_SALT_ROUNDS),
      );

      await this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
      });

      return new MsgResponse('User created successfully');
    } catch (error) {
      new TryCatchError().catchError(
        error,
        'User',
        'email or phone_number',
        'creating',
      );
    }
  }

  async findAll(query): Promise<MultipleObjectsResponse> {
    try {
      const options: FindManyOptions = RepositoryQuery.createRepoQuery(query);

      const users = await this.userRepository.findAndCount(options);

      return new MultipleObjectsResponse(
        users[0],
        new Pagination(query, users[0].length, users[1]),
      );
    } catch (error) {
      new TryCatchError().catchError(
        error,
        'Users',
        'email or phone_no',
        'getting',
      );
    }
  }

  async findOne(id: string): Promise<SingleObjectResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return new SingleObjectResponse(user);
    } catch (error) {
      new TryCatchError().catchError(
        error,
        'User',
        'email or phone_number',
        'getting',
      );
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      return user;
    } catch (error) {
      new TryCatchError().catchError(
        error,
        'User',
        'email or phone_number',
        'getting',
      );
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<MsgResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      if (updateUserDto.password) {
        updateUserDto.password = await hash(
          updateUserDto.password,
          Number(process.env.BYCRYPT_SALT_ROUNDS),
        );
      }

      await this.userRepository.update(
        { id },
        updateUserDto,
      );

      return new MsgResponse('User updated successfully');
    } catch (error) {
      new TryCatchError().catchError(
        error,
        'User',
        'email or phone_number',
        'updating',
      );
    }
  }

  async remove(id: string): Promise<MsgResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      // await this.userRepository.softDelete({ id });
      await this.userRepository.delete({ id });
      return new MsgResponse('User deleted successfully');
    } catch (error) {
      new TryCatchError().catchError(
        error,
        'User',
        'email or phone_number',
        'deleting',
      );
    }
  }
}
