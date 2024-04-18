import { HttpException, Injectable } from '@nestjs/common';
import { TryCatchError } from 'src/common/errors/try-catch.errors';
import { MsgResponse } from 'src/common/responses.common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    @InjectRepository(User) private userRepository: Repository<User>,
    // eslint-disable-next-line no-unused-vars
    private readonly usersService: UsersService,
  ) {}

  async seed() {
    try {
      if (!['test', 'dev', 'development'].includes(process.env.NODE_ENV))
        throw new HttpException(
          'Seed can only be run in test or dev environment',
          400,
        );

      // create admin
      const user = await this.usersService.findOneByEmail('admin@example.com');
      console.log(user)
      if (!user) {
        console.log('Default Admin not found...');
        console.log('Creating a default admin...');
        await this.usersService.create({
          name: 'Admin',
          email: 'admin@example.com',
          phone_number: '+254712345678',
          password: 'Pass@word1',
          is_admin: true,
          company: 'Fanisi LTD',
        });
        console.log('Admin created successfully...');
      }

      return new MsgResponse('Seed completed successfully');
    } catch (error) {
      new TryCatchError().catchError(error, '', 'name', 'seeding');
    }
  }
}
