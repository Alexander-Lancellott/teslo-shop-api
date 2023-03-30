"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const common_1 = require("@nestjs/common");
class Helper {
    constructor(context) {
        this.logger = new common_1.Logger(context);
    }
    handleDBExceptions(error) {
        if (error.code === '23505') {
            throw new common_1.BadRequestException(error.detail);
        }
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Unexpected error, check server logs');
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map