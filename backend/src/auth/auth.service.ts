import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { MsgResponse, SingleObjectResponse } from 'src/common/responses.common';
import { TryCatchError } from 'src/common/errors/try-catch.errors';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto): Promise<SingleObjectResponse> {
    try {
      const { email, password } = loginDto;
      const user = await this.usersService.findOneByEmail(email);
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.UNAUTHORIZED,
        );
      }

      // generate token
      const token = await this.generateToken(user);

      return new SingleObjectResponse({ user, ...token });
    } catch (error) {
      new TryCatchError().catchError(error, 'User', '', 'logging in');
    }
  }

  private async generateToken(user: User): Promise<any> {
    const token = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRATION',
        ),
      },
    );

    return {
      token,
    };
  }
}
