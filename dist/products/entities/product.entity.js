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
exports.Product = exports.gender = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const product_image_entity_1 = require("./product-image.entity");
const RenameEntities_1 = require("../../migrations/RenameEntities");
const user_entity_1 = require("../../auth/entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
const seed_data_1 = require("../../seed/data/seed-data");
const cleanSlug = (slug) => {
    return slug.toLowerCase().replaceAll(' ', '_').replaceAll(/'|`/g, '');
};
exports.gender = ['men', 'women', 'kid', 'unisex'];
let Product = class Product {
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }
        this.slug = cleanSlug(this.slug);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, price: { required: true, type: () => Number }, description: { required: true, type: () => String }, slug: { required: true, type: () => String }, stock: { required: true, type: () => Number }, sizes: { required: true, type: () => [String] }, gender: { required: true, type: () => String }, tags: { required: true, type: () => [String] }, images: { required: false, type: () => Object }, user: { required: true, type: () => require("../../auth/entities/user.entity").User }, creatAt: { required: true, type: () => Date }, updateAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: seed_data_1.initialData.products[0].title, uniqueItems: true }),
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 99.99 }),
    (0, typeorm_1.Column)('float', { default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: seed_data_1.initialData.products[0].description }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: seed_data_1.initialData.products[0].slug }),
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'interger', example: seed_data_1.initialData.products[0].stock }),
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: seed_data_1.initialData.products[0].sizes }),
    (0, typeorm_1.Column)('text', { array: true }),
    __metadata("design:type", Array)
], Product.prototype, "sizes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: seed_data_1.initialData.products[0].gender,
        enum: exports.gender,
    }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Product.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: seed_data_1.initialData.products[0].tags }),
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        type: 'string',
        example: seed_data_1.initialData.products[0].images,
    }),
    (0, typeorm_1.OneToMany)(() => product_image_entity_1.ProductImage, (productImage) => productImage.product, {
        cascade: true,
        eager: true,
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        return value.map((image) => image.url);
    }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.products, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Product.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "creatAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Product.prototype, "checkSlugInsert", null);
Product = __decorate([
    (0, typeorm_1.Entity)({ name: RenameEntities_1.ENTITIES_NAME.Product.current })
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map