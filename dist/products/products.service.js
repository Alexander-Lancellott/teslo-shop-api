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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
const RenameEntities_1 = require("../migrations/RenameEntities");
const helper_1 = require("../common/helper/helper");
let ProductsService = class ProductsService {
    constructor(productRepository, productImageRepository, dataSource) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.dataSource = dataSource;
        this.helper = new helper_1.Helper('ProductsService');
        this.handlerProduct = (images, restProduct, user) => {
            const imagesDto = images.map((image) => this.productImageRepository.create({ url: image }));
            return {
                ...restProduct,
                images: imagesDto,
                user,
            };
        };
    }
    async create(createProductDto, user) {
        try {
            const { images, ...restProduct } = createProductDto;
            const product = this.productRepository.create({
                ...this.handlerProduct(images, restProduct, user),
            });
            await this.productRepository.save(product);
            return { ...product, images };
        }
        catch (error) {
            this.helper.handleDBExceptions(error);
        }
    }
    async findAll(paginationDto) {
        const { limit = 10, page = 1 } = paginationDto;
        const products = await this.productRepository.find({
            take: limit,
            skip: (page - 1) * limit,
            order: { creatAt: 'ASC' },
        });
        const total = await this.productRepository.count();
        const totalPages = Math.ceil(total / limit);
        return { total, totalPages, page, products };
    }
    async findOne(term, termType = 'id, title or slug') {
        let product;
        if ((0, class_validator_1.isUUID)(term)) {
            product = await this.productRepository.findOneBy({ id: term });
        }
        else {
            const queryBuilder = this.productRepository.createQueryBuilder('prod');
            product = await queryBuilder
                .where('UPPER(title) = :title or slug = :slug', {
                title: term.toUpperCase(),
                slug: term.toLowerCase(),
            })
                .leftJoinAndSelect('prod.images', 'prodImages')
                .leftJoinAndSelect('prod.user', 'prodUser')
                .getOne();
        }
        if (!product)
            throw new common_1.NotFoundException(`Product with ${termType} '${term}' not found`);
        return product;
    }
    async update(id, updateProductDto, user) {
        const { images, ...toUpdate } = updateProductDto;
        const product = await this.findOne(id, 'id');
        if (product.user.id !== user.id)
            throw new common_1.BadRequestException(`You can't perform this update.`);
        const updateProduct = this.productRepository.create({
            ...product,
            ...toUpdate,
        });
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (images) {
                await queryRunner.manager.delete(entities_1.ProductImage, { product: id });
                updateProduct.images = this.handlerProduct(images).images;
            }
            const result = await queryRunner.manager.save(updateProduct);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return result;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.helper.handleDBExceptions(error);
        }
    }
    async remove(id, user) {
        const product = await this.findOne(id, 'id');
        if (product.user.id !== user.id && !user.roles.includes('admin'))
            throw new common_1.BadRequestException(`You can't perform this delete.`);
        await this.productRepository.remove(product);
        return product;
    }
    async deleteAllProducts(hard = false, product) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const titles = [];
        product.forEach(({ title }) => titles.push(title));
        try {
            await queryRunner.manager
                .createQueryBuilder()
                .delete()
                .from(entities_1.Product)
                .where(hard ? {} : 'title In(:...title)', { title: titles })
                .execute();
            if (hard) {
                await queryRunner.manager.query(`ALTER SEQUENCE ${RenameEntities_1.ENTITIES_NAME.ProductImage.current}_id_seq RESTART 1`);
            }
            await queryRunner.commitTransaction();
            return await queryRunner.release();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.helper.handleDBExceptions(error);
        }
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.ProductImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map