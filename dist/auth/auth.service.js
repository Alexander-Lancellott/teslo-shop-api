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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const helper_1 = require("../common/helper/helper");
const config_1 = require("@nestjs/config");
const exceptions_1 = require("@nestjs/common/exceptions");
const interfaces_1 = require("./interfaces");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.helper = new helper_1.Helper('AuthService');
        this.secret = configService.getOrThrow('SECRET');
    }
    getJwtToken(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
    async create(createUserDto) {
        try {
            const { password, ...userData } = createUserDto;
            const user = this.userRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10),
            });
            if (createUserDto.secret === this.secret)
                user.roles = [interfaces_1.ValidRoles.admin];
            await this.userRepository.save(user);
            delete user.password;
            return { ...user, token: this.getJwtToken({ id: user.id }) };
        }
        catch (error) {
            this.helper.handleDBExceptions(error);
        }
    }
    async changeRolesAndStatus(userId, changeRolesAndStatusDto) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user)
            throw new exceptions_1.BadRequestException(`User with id '${userId}' not found`);
        const updateUser = this.userRepository.create({
            ...user,
            ...changeRolesAndStatusDto,
        });
        return await this.userRepository.save(updateUser);
    }
    async login(loginUserDto) {
        const { password, email } = loginUserDto;
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['email', 'password', 'id', 'isActive'],
        });
        if (!user || !bcrypt.compareSync(password, user.password))
            throw new common_1.UnauthorizedException('Credentials are not valid');
        if (!user.isActive)
            throw new common_1.UnauthorizedException('User is inactive, talk with an admin');
        return {
            id: user.id,
            email: user.email,
            token: this.getJwtToken({ id: user.id }),
        };
    }
    async checkStatus(user) {
        return {
            ...user,
            token: this.getJwtToken({ id: user.id }),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map