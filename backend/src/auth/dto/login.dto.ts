import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Pass@word1' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
