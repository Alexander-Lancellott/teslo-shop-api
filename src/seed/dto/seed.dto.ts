import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ParseBoolean } from '../../common/decorators';

export class SeedDto {
  @IsOptional()
  @ParseBoolean()
  hard?: boolean;

  @IsString()
  @IsNotEmpty({})
  @Transform(({ value }) => value?.trim())
  secret: string;
}
