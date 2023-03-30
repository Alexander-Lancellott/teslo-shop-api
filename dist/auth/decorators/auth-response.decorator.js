"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiChangeRolesAndStatusResponse = exports.ApiCheckStatusResponse = exports.ApiLoginResponse = exports.ApiRegisterResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../entities/user.entity");
class LoginResponse extends (0, swagger_1.OmitType)(user_entity_1.User, [
    'fullName',
    'roles',
    'isActive',
]) {
}
const AuthResponse = ({ islogin = false }) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(LoginResponse), (0, swagger_1.ApiResponse)({
        status: islogin ? 200 : 201,
        schema: {
            allOf: [
                {
                    $ref: (0, swagger_1.getSchemaPath)(islogin ? LoginResponse : user_entity_1.User),
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
    }));
};
const ApiRegisterResponse = () => {
    return (0, common_1.applyDecorators)(AuthResponse({}), (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }));
};
exports.ApiRegisterResponse = ApiRegisterResponse;
const ApiLoginResponse = () => {
    return (0, common_1.applyDecorators)(AuthResponse({ islogin: true }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }), (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }));
};
exports.ApiLoginResponse = ApiLoginResponse;
const ApiCheckStatusResponse = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)(), AuthResponse({}), (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden. Token related.' }), (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }));
};
exports.ApiCheckStatusResponse = ApiCheckStatusResponse;
const ApiChangeRolesAndStatusResponse = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiParam)({ name: 'userId', format: 'uuid' }), (0, swagger_1.ApiOkResponse)({ type: user_entity_1.User }), (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden. Token related.' }), (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }));
};
exports.ApiChangeRolesAndStatusResponse = ApiChangeRolesAndStatusResponse;
//# sourceMappingURL=auth-response.decorator.js.map