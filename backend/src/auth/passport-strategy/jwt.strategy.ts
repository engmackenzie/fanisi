import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TryCatchError } from 'src/common/errors/try-catch.errors';
import { UsersService } from 'src/users/users.service';

type JwtPayload = {
  id: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    // eslint-disable-next-line no-unused-vars
    private readonly usersService: UsersService,
    // eslint-disable-next-line no-unused-vars
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET') ?? '',
    });
  }

  async validate(payload: JwtPayload) {
    try {
      // get user and role data
      const userData = await this.usersService.findOne(payload.id);

      // remove unnecessary items from user object
      delete userData.data.password;
      delete userData.data.created_at;
      delete userData.data.updated_at;

      // attach user data
      return { ...userData.data };
    } catch (error) {
      new TryCatchError().catchError(error, 'user', '', 'authenticating');
    }
  }
}
