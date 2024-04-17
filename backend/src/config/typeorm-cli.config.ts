import { ConfigService, registerAs } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();
const nodeEnv = configService.get<string>('NODE_ENV');

const configuration = {
  type: 'postgres',
  host: configService.get<string>(
    nodeEnv === 'production' ? 'DB_HOST' : 'TEST_DB_HOST',
  ),
  port: configService.get<number>(
    nodeEnv === 'production' ? 'DB_PORT' : 'TEST_DB_PORT',
  ),
  username: configService.get<string>(
    nodeEnv === 'production' ? 'DB_USERNAME' : 'TEST_DB_USERNAME',
  ),
  password: configService.get<string>(
    nodeEnv === 'production' ? 'DB_PASSWORD' : 'TEST_DB_PASSWORD',
  ),
  database: configService.get<string>(
    nodeEnv === 'production' ? 'DB_NAME' : 'TEST_DB_NAME',
  ),
  logging: configService.get<boolean>(
    nodeEnv === 'production' ? 'DB_LOGGING' : 'TEST_DB_LOGGING',
  ),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
  autoLoadEntities: true,
};

export default registerAs('typeOrmConfig', () => configuration);
export const connectionSource = new DataSource(
  configuration as DataSourceOptions,
);
