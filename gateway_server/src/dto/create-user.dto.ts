import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '8자 이상, 대문자 및 특수문자를 포함해야 합니다.' })
  @IsString()
  @MinLength(8)
  password: string;
}