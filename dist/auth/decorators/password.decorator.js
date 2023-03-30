"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPropertyPassword = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const seed_data_1 = require("../../seed/data/seed-data");
const ApiPropertyPassword = () => {
    const min = 6;
    const max = 16;
    const description = 'The password must have a Uppercase, lowercase letter and a number';
    const regExp = '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z]).+$';
    return (0, common_1.applyDecorators)((0, swagger_1.ApiProperty)({
        format: 'password',
        description,
        minLength: min,
        maxLength: max,
        pattern: regExp,
        example: seed_data_1.initialData.users[1].password,
    }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(min), (0, class_validator_1.MaxLength)(max), (0, class_validator_1.Matches)(new RegExp(regExp, 'g'), {
        message: description,
    }));
};
exports.ApiPropertyPassword = ApiPropertyPassword;
//# sourceMappingURL=password.decorator.js.map