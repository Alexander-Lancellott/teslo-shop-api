"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSeedResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiSeedResponse = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        schema: {
            properties: {
                message: {
                    type: 'string',
                    enum: ['SEED EXECUTED', 'HARD SEED EXECUTED'],
                },
            },
        },
    }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }));
};
exports.ApiSeedResponse = ApiSeedResponse;
//# sourceMappingURL=seed-response.js.map