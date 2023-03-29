import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

export const ApiSeedResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          message: {
            type: 'string',
            enum: ['SEED EXECUTED', 'HARD SEED EXECUTED'],
          },
        },
      },
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
};
