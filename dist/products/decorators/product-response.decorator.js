"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFindAllResponse = exports.ApiFindOneResponse = exports.ApiDeleteUpdateResponse = exports.ApiProductResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const entities_1 = require("../entities");
const ApiProductResponse = (type = 'created') => {
    let description;
    let status;
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
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiResponse)({
        status,
        description,
        type: entities_1.Product,
    }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }), (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden. Token related.' }), (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }));
};
exports.ApiProductResponse = ApiProductResponse;
const ApiDeleteUpdateResponse = (type) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiParam)({ name: 'id', format: 'uuid' }), (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found Product' }), (0, exports.ApiProductResponse)(type));
};
exports.ApiDeleteUpdateResponse = ApiDeleteUpdateResponse;
const ApiFindOneResponse = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiParam)({ description: 'Must be id, title or slug', name: 'term' }), (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found Product' }));
};
exports.ApiFindOneResponse = ApiFindOneResponse;
const ApiFindAllResponse = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        schema: {
            required: ['total', 'totalPages', 'page', 'products'],
            properties: {
                total: { type: 'number', example: 1 },
                totalPages: { type: 'number', example: 1 },
                page: { type: 'number', default: 1 },
                products: {
                    type: 'array',
                    items: {
                        $ref: (0, swagger_1.getSchemaPath)(entities_1.Product),
                    },
                },
            },
        },
    }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }));
};
exports.ApiFindAllResponse = ApiFindAllResponse;
//# sourceMappingURL=product-response.decorator.js.map