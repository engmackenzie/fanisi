import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport-strategy/jwt.strategy';
import { AuthenticationGuard } from './guard/authentication.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './guard/authorization.guard';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    JwtModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
