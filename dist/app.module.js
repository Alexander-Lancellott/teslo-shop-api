"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const typeorm_1 = require("@nestjs/typeorm");
const joi_validation_1 = require("./config/joi.validation");
const products_module_1 = require("./products/products.module");
const common_module_1 = require("./common/common.module");
const seed_module_1 = require("./seed/seed.module");
const files_module_1 = require("./files/files.module");
const auth_module_1 = require("./auth/auth.module");
const messages_ws_module_1 = require("./messages-ws/messages-ws.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: joi_validation_1.JoiValidationSchema,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'public'),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const stage = configService.getOrThrow('STAGE');
                    return {
                        type: 'postgres',
                        host: configService.getOrThrow('DB_HOST'),
                        port: configService.getOrThrow('DB_PORT'),
                        database: configService.getOrThrow('DB_NAME'),
                        username: configService.getOrThrow('DB_USERNAME'),
                        password: configService.getOrThrow('DB_PASSWORD'),
                        autoLoadEntities: true,
                        synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
                        ssl: stage === 'prod',
                        extra: {
                            ssl: stage === 'prod' ? { rejectUnauthorized: false } : null,
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            products_module_1.ProductsModule,
            common_module_1.CommonModule,
            seed_module_1.SeedModule,
            files_module_1.FilesModule,
            auth_module_1.AuthModule,
            messages_ws_module_1.MessagesWsModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map