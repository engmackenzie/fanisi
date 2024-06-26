/* eslint-disable no-unused-vars */
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+254712345678' })
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({ example: 'Kenya@1964' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'password must be at least 8 characters, have at least one uppercase & one lowercase letter, and one number',
  })
  @IsString()
  password: string;

  @ApiProperty({ example: 'Equity Bank' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsBoolean()
  is_admin: boolean;
}
