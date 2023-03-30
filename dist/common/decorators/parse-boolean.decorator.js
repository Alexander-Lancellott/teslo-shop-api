"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseBoolean = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const transformToBoolean_1 = require("../transformers/transformToBoolean");
function ParseBoolean(options) {
    return (0, common_1.applyDecorators)((0, transformToBoolean_1.TransformToBoolean)(options), (0, class_validator_1.IsBoolean)());
}
exports.ParseBoolean = ParseBoolean;
//# sourceMappingURL=parse-boolean.decorator.js.map