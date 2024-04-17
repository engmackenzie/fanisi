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
      'new_password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter and one number',
  })
  @IsString()
  password: string;

  @IsBoolean()
  is_admin: boolean;
}
