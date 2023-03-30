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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("../products/products.service");
const seed_data_1 = require("./data/seed-data");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../auth/entities/user.entity");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
let SeedService = class SeedService {
    constructor(productsService, configService, userRepository) {
        this.productsService = productsService;
        this.configService = configService;
        this.userRepository = userRepository;
        this.secret = configService.getOrThrow('SECRET');
    }
    async runSeed({ hard, secret }) {
        if (secret !== this.secret)
            throw new common_1.BadRequestException('First talk to the admin');
        const seedProducts = seed_data_1.initialData.products;
        const seedUsers = seed_data_1.initialData.users;
        await this.deleteTables(hard, seedProducts, seedUsers);
        const users = await this.insertUsers(seedUsers);
        await this.insertNewProducts(users[1], seedProducts);
        return {
            message: hard ? 'HARD SEED EXECUTED' : 'SEED EXECUTED',
        };
    }
    async insertUsers(seedUsers) {
        const users = [];
        seedUsers.forEach(({ password, ...user }) => {
            users.push(this.userRepository.create({
                ...user,
                password: bcrypt.hashSync(password, 10),
            }));
        });
        return await this.userRepository.save(users);
    }
    async deleteTables(hard, seedProducts, seedUsers) {
        await this.productsService.deleteAllProducts(hard, seedProducts);
        const usersEmail = [];
        seedUsers.forEach(({ email }) => usersEmail.push(email));
        const queryBuilder = this.userRepository.createQueryBuilder();
        await queryBuilder
            .delete()
            .where(hard ? {} : 'email In(:...email)', { email: usersEmail })
            .execute();
    }
    async insertNewProducts(user, seedProducts) {
        const insertPromises = [];
        seedProducts.forEach((product) => {
            insertPromises.push(this.productsService.create(product, user));
        });
        return await Promise.all(insertPromises);
    }
};
SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        config_1.ConfigService,
        typeorm_2.Repository])
], SeedService);
exports.SeedService = SeedService;
//# sourceMappingURL=seed.service.js.map