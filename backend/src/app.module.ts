import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import typeOrmConfig from './config/typeorm-cli.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    /*
     * Throttler module
     * Not more that 6 requests per second
     * Not more than 60 requests per 10 seconds
     * Not more than 200 requests per minute
     */
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 6,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 60,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 200,
      },
    ]),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeOrmConfig'),
    }),
    AuthModule,
    UsersModule,
    SeedModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
