import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { FileUploadDto } from '../dto/file-upload.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { config } from 'dotenv';
config();

const host = process.env.HOST_API;

export const ApiGetImageResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      content: {
        'image/*': {
          schema: {
            type: 'file',
            format: 'binary',
          },
        },
      },
    }),
    ApiNotFoundResponse({ description: 'Not found image' }),
  );
};

export const ApiUploadImageResponse = () => {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: FileUploadDto,
    }),
    ApiCreatedResponse({
      schema: {
        properties: {
          secureUrl: {
            type: 'string',
            example: `${host}/files/product/1740176-00-A_1.jpg`,
          },
        },
      },
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
};
