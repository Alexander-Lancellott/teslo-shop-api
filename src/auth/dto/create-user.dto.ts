import { OmitType, IntersectionType, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { ApiPropertyPassword } from '../decorators';
import { User } from '../entities/user.entity';

export class CreateUser {
  @IsEmail()
  email: string;

  @ApiPropertyPassword()
  password: string;

  @IsString()
  @MinLength(1)
  fullName: string;

  @ApiProperty({ example: 'XXXXXX' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  secret?: string;
}

export class CreateUserDto extends IntersectionType(
  OmitType(User, [
    'id',
    'isActive',
    'checkFields',
    'password',
    'roles',
    'products',
  ] as const),
  CreateUser,
) {}
