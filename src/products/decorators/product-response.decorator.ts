import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { Product } from '../entities';

export const ApiProductResponse = (
  type: 'created' | 'updated' | 'deleted' = 'created',
) => {
  let description: string;
  let status: number;

  switch (type) {
    case 'created':
      description = 'Product was created';
      status = 201;
      break;
    case 'updated':
      description = 'Product was updated';
      status = 200;
      break;
    case 'deleted':
      description = 'Product was deleted';
      status = 200;
  }

  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status,
      description,
      type: Product,
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiForbiddenResponse({ description: 'Forbidden. Token related.' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};

export const ApiDeleteUpdateResponse = (type: 'deleted' | 'updated') => {
  return applyDecorators(
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiNotFoundResponse({ description: 'Not Found Product' }),
    ApiProductResponse(type),
  );
};

export const ApiFindOneResponse = () => {
  return applyDecorators(
    ApiParam({ description: 'Must be id, title or slug', name: 'term' }),
    ApiNotFoundResponse({ description: 'Not Found Product' }),
  );
};

export const ApiFindAllResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        required: ['total', 'totalPages', 'page', 'products'],
        properties: {
          total: { type: 'number', example: 1 },
          totalPages: { type: 'number', example: 1 },
          page: { type: 'number', default: 1 },
          products: {
            type: 'array',
            items: {
              $ref: getSchemaPath(Product),
            },
          },
        },
      },
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
};
