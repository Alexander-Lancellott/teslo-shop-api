import { applyDecorators } from '@nestjs/common';
import { IsBoolean } from 'class-validator';
import {
  TransformToBoolean,
  Options,
} from '../transformers/transformToBoolean';

export function ParseBoolean(options?: Options) {
  return applyDecorators(TransformToBoolean(options), IsBoolean());
}
