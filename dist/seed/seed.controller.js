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
exports.SeedController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const seed_service_1 = require("./seed.service");
const seed_dto_1 = require("./dto/seed.dto");
const seed_response_1 = require("./decorators/seed-response");
let SeedController = class SeedController {
    constructor(seedService) {
        this.seedService = seedService;
    }
    executedSeed(seedDto) {
        return this.seedService.runSeed(seedDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, seed_response_1.ApiSeedResponse)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seed_dto_1.SeedDto]),
    __metadata("design:returntype", void 0)
], SeedController.prototype, "executedSeed", null);
SeedController = __decorate([
    (0, swagger_1.ApiTags)('Seed'),
    (0, common_1.Controller)('seed'),
    __metadata("design:paramtypes", [seed_service_1.SeedService])
], SeedController);
exports.SeedController = SeedController;
//# sourceMappingURL=seed.controller.js.map