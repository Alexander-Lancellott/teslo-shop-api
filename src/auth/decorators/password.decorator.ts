import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { initialData } from '../../seed/data/seed-data';

export const ApiPropertyPassword = () => {
  const min = 6;
  const max = 16;
  const description =
    'The password must have a Uppercase, lowercase letter and a number';

  const regExp = '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z]).+$'; // /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

  return applyDecorators(
    ApiProperty({
      format: 'password',
      description,
      minLength: min,
      maxLength: max,
      pattern: regExp,
      example: initialData.users[1].password,
    }),
    IsString(),
    MinLength(min),
    MaxLength(max),
    Matches(new RegExp(regExp, 'g'), {
      message: description,
    }),
  );
};
