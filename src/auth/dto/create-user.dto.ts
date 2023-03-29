import { OmitType, IntersectionType } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

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
