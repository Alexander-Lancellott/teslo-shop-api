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
exports.CreateProductDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const product_entity_1 = require("../entities/product.entity");
const class_validator_1 = require("class-validator");
class CreateProduct {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String, minLength: 1 }, price: { required: false, type: () => Number, minimum: 0 }, description: { required: false, type: () => String }, slug: { required: false, type: () => String }, stock: { required: false, type: () => Number }, sizes: { required: true, type: () => [String] }, gender: { required: true, type: () => String, enum: product_entity_1.gender }, tags: { required: false, type: () => [String] }, images: { required: false, type: () => [String] } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateProduct.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProduct.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProduct.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProduct.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProduct.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateProduct.prototype, "sizes", void 0);
__decorate([
    (0, class_validator_1.IsIn)(product_entity_1.gender),
    __metadata("design:type", String)
], CreateProduct.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateProduct.prototype, "tags", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateProduct.prototype, "images", void 0);
class CreateProductDto extends (0, swagger_1.IntersectionType)((0, swagger_1.OmitType)(product_entity_1.Product, [
    'id',
    'user',
    'creatAt',
    'updateAt',
    'checkSlugInsert',
]), CreateProduct) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map