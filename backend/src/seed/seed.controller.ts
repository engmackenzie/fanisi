import { Controller, Post, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';
import { AllowAnon } from 'src/common/decorators/auth.decorators';

@ApiTags('seed')
@Controller('seed')
@AllowAnon()
export class SeedController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @HttpCode(200)
  async seed() {
    return this.seedService.seed();
  }
}
