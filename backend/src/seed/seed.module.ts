import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { UsersModule } from 'src/users/users.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UsersModule, OrganizationsModule],
})
export class SeedModule {}
