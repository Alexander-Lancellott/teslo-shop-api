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
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';

class LoginResponse extends OmitType(User, [
  'fullName',
  'roles',
  'isActive',
] as const) {}

const AuthResponse = ({ islogin = false }) => {
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

export const ApiRegisterResponse = () => {
  return applyDecorators(
    AuthResponse({}),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
};

export const ApiLoginResponse = () => {
  return applyDecorators(
    AuthResponse({ islogin: true }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};

export const ApiCheckStatusResponse = () => {
  return applyDecorators(
    ApiBearerAuth(),
    AuthResponse({}),
    ApiForbiddenResponse({ description: 'Forbidden. Token related.' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};

export const ApiChangeRolesAndStatusResponse = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOkResponse({ type: User }),
    ApiForbiddenResponse({ description: 'Forbidden. Token related.' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};
