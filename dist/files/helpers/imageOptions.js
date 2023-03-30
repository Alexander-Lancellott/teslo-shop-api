"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageOptions = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const configService = new config_1.ConfigService();
const stage = configService.get('STAGE');
const fileType = '(jpg|jpeg|png|gif)';
const fileNamer = (req, file, callback) => {
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
    return callback(null, fileName);
};
const imageFilter = (req, file, callback) => {
    if (!file.mimetype.match(fileType))
        return callback(new common_1.BadRequestException(`Validation failed (expected type is ${fileType})`), false);
    return callback(null, true);
};
exports.imageOptions = {
    fileFilter: imageFilter,
    storage: (0, multer_1.diskStorage)({
        destination: stage === 'prod' ? '/tmp/' : './static/products',
        filename: fileNamer,
    }),
};
//# sourceMappingURL=imageOptions.js.map