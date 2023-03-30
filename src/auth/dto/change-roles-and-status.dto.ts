import { ArrayNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ParseBoolean } from '../../common/decorators';
import { ValidRoles } from '../interfaces';

export class ChangeRolesAndStatusDto {
  @ApiProperty({ enum: ValidRoles, isArray: true })
  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(ValidRoles, { each: true })
  roles?: string[];

  @IsOptional()
  @ParseBoolean()
  isActive?: boolean;
}
