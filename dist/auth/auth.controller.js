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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const get_user_decorator_1 = require("./decorators/get-user.decorator");
const dto_1 = require("./dto");
const user_entity_1 = require("./entities/user.entity");
const raw_headers_decorator_1 = require("../common/decorators/raw-headers.decorator");
const user_role_guard_1 = require("./guards/user-role/user-role.guard");
const decorators_1 = require("./decorators");
const interfaces_1 = require("./interfaces");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    createUser(createUserDto) {
        return this.authService.create(createUserDto);
    }
    loginUser(loginUserDto) {
        return this.authService.login(loginUserDto);
    }
    checkStatus(user) {
        return this.authService.checkStatus(user);
    }
    changeRolesAndStatus(userId, changeRolesAndStatusDto) {
        return this.authService.changeRolesAndStatus(userId, changeRolesAndStatusDto);
    }
    testingPrivateRoute(user, user2, rawHeaders, headers) {
        return { user, user2, rawHeaders, headers };
    }
    testingPrivateRoute2(user) {
        return { user };
    }
    testingPrivateRoute3(user) {
        return { user };
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, decorators_1.ApiRegisterResponse)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('login'),
    (0, decorators_1.ApiLoginResponse)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)('check-status'),
    (0, decorators_1.Auth)(),
    (0, decorators_1.ApiCheckStatusResponse)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkStatus", null);
__decorate([
    (0, common_1.Patch)('change-roles-and-status/:userId'),
    (0, decorators_1.Auth)(interfaces_1.ValidRoles.admin),
    (0, decorators_1.ApiChangeRolesAndStatusResponse)(),
    openapi.ApiResponse({ status: 200, type: require("./entities/user.entity").User }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ChangeRolesAndStatusDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changeRolesAndStatus", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)('private'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, get_user_decorator_1.GetUser)('email')),
    __param(2, (0, raw_headers_decorator_1.RawHeaders)()),
    __param(3, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        user_entity_1.User, Array, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "testingPrivateRoute", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)('private2'),
    (0, decorators_1.RoleProctected)(interfaces_1.ValidRoles.superUser, interfaces_1.ValidRoles.admin),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), user_role_guard_1.UserRoleGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "testingPrivateRoute2", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)('private3'),
    (0, decorators_1.Auth)(interfaces_1.ValidRoles.admin, interfaces_1.ValidRoles.superUser),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "testingPrivateRoute3", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map