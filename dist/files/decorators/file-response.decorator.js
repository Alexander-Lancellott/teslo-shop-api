"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUploadImageResponse = exports.ApiGetImageResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const file_upload_dto_1 = require("../dto/file-upload.dto");
const swagger_2 = require("@nestjs/swagger");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const host = process.env.HOST_API;
const ApiGetImageResponse = () => {
    return (0, common_1.applyDecorators)((0, swagger_2.ApiOkResponse)({
        content: {
            'image/*': {
                schema: {
                    type: 'file',
                    format: 'binary',
                },
            },
        },
    }), (0, swagger_1.ApiNotFoundResponse)({ description: 'Not found image' }));
};
exports.ApiGetImageResponse = ApiGetImageResponse;
const ApiUploadImageResponse = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
        type: file_upload_dto_1.FileUploadDto,
    }), (0, swagger_1.ApiCreatedResponse)({
        schema: {
            properties: {
                secureUrl: {
                    type: 'string',
                    example: `${host}/files/product/1740176-00-A_1.jpg`,
                },
            },
        },
    }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }));
};
exports.ApiUploadImageResponse = ApiUploadImageResponse;
//# sourceMappingURL=file-response.decorator.js.map