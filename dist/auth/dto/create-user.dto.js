"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = exports.CreateUser = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../decorators");
const user_entity_1 = require("../entities/user.entity");
class CreateUser {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, password: { required: true, type: () => String }, fullName: { required: true, type: () => String, minLength: 1 }, secret: { required: false, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUser.prototype, "email", void 0);
__decorate([
    (0, decorators_1.ApiPropertyPassword)(),
    __metadata("design:type", String)
], CreateUser.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateUser.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'XXXXXX' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateUser.prototype, "secret", void 0);
exports.CreateUser = CreateUser;
class CreateUserDto extends (0, swagger_1.IntersectionType)((0, swagger_1.OmitType)(user_entity_1.User, [
    'id',
    'isActive',
    'checkFields',
    'password',
    'roles',
    'products',
]), CreateUser) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map