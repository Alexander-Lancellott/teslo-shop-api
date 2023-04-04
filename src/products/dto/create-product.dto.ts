import { Type } from 'class-transformer';
import { OmitType, IntersectionType } from '@nestjs/swagger';
import { Product, gender } from '../entities/product.entity';
import {
  IsInt,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  MinLength,
  IsArray,
  IsIn,
} from 'class-validator';

class CreateProduct {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  stock?: number;

  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsIn(gender)
  gender: string;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  tags?: string[];
}

export class CreateProductDto extends IntersectionType(
  OmitType(Product, [
    'id',
    'user',
    'creatAt',
    'updateAt',
    'images',
    'checkSlugInsert',
  ] as const),
  CreateProduct,
) {}
