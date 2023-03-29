import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiResponse,
  ApiExtraModels,
  getSchemaPath,
  OmitType,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';

class LoginResponse extends OmitType(User, [
  'fullName',
  'roles',
  'isActive',
] as const) {}

const AuthGeneralResponse = ({ islogin = false }) => {
  return applyDecorators(
    ApiExtraModels(LoginResponse),
    ApiResponse({
      status: islogin ? 200 : 201,
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(islogin ? LoginResponse : User),
          },
          {
            properties: {
              token: {
                type: 'string',
                format: 'jwt',
                example: 'XXXXX.XXXXX.XXXXXX',
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiAuthResponse = ({ islogin = false }) => {
  return applyDecorators(
    AuthGeneralResponse({ islogin }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
};

export const ApiCheckStatusResponse = () => {
  return applyDecorators(
    ApiBearerAuth(),
    AuthGeneralResponse({}),
    ApiForbiddenResponse({ description: 'Forbidden. Token related.' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};
