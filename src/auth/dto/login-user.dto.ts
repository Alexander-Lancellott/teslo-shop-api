import { IsEmail } from 'class-validator';
import { ApiPropertyPassword } from '../decorators';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @ApiPropertyPassword()
  password: string;
}
