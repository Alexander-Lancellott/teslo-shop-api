import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiParam,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { FileUploadDto } from '../dto/file-upload.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { config } from 'dotenv';
import { Product } from '../../products/entities';
import { initialData } from '../../seed/data/seed-data';
config();

const cloudinarySeedFolder = process.env.CLOUDINARY_SEED_FOLDER;

export const ApiUploadImageResponse = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: FileUploadDto,
    }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiOkResponse({
      description: 'Images was upload',
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(Product),
          },
          {
            properties: {
              images: {
                example: [
                  `${cloudinarySeedFolder}/${initialData.products[0].images[0]}`,
                  `${cloudinarySeedFolder}/${initialData.products[0].images[1]}`,
                ],
              },
            },
          },
        ],
      },
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiForbiddenResponse({ description: 'Forbidden. Token related.' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};
