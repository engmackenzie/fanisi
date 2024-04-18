import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone_number: '+254712345678',
        company: 'ABC Inc.',
        password: 'passworD@123',
        is_admin: true,
      };

      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(null);

      const result = await service.create(createUserDto);
      expect(result.message).toEqual('User created successfully');
    });
  });

  describe('findOne', () => {
    it('should find a user by ID', async () => {
      const userId = '1';
      const user = new User();
      user.id = userId;

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

      const result = await service.findOne(userId);
      expect(result).toEqual(expect.objectContaining({ id: userId }));
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = '999';

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findOne(userId)).rejects.toThrowError(NotFoundException);
    });
  });

  // Add more test cases for other methods like findAll, update, remove, etc.
});


