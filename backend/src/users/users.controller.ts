import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Request,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Permission } from 'src/common/decorators/permission.decorator';
import { Permissions } from 'src/common/constants/permissions.constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permission(Permissions.CREATE_USER)
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Permission(Permissions.READ_USER)
  async findAll(@Query() query) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @Permission(Permissions.READ_USER)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Permission(Permissions.UPDATE_USER)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Permission(Permissions.DELETE_USER)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
