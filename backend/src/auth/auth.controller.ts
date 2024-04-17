import {
  Post,
  Body,
  Controller,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AllowAnon, DisableAnon } from 'src/common/decorators/auth.decorators';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@AllowAnon()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
