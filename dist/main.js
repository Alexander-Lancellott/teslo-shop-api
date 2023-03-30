"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const dist_1 = require("@nestjs/swagger/dist");
const swagger_helper_1 = require("./common/helper/swagger.helper");
const parseAppUrl = async (app) => {
    const url = await app.getUrl();
    return url.replace(/\[::1]|127.0.0.1/, 'localhost');
};
async function bootstrap() {
    console.log(process.env.NODE_ENV);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const logger = new common_1.Logger('Bootstrap');
    const port = configService.get('PORT');
    const swaggerUpdate = configService.get('SWAGGER_UPDATE');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Teslo-shop API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = dist_1.SwaggerModule.createDocument(app, config);
    dist_1.SwaggerModule.setup('doc', app, document, {
        customCssUrl: '/css/custom.css',
    });
    await app.listen(port);
    logger.log(`App is running on: ${await parseAppUrl(app)}`);
    (0, swagger_helper_1.updateDoc)(swaggerUpdate, port);
}
bootstrap();
//# sourceMappingURL=main.js.map