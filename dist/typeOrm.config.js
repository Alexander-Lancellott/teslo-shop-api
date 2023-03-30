"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const entities_1 = require("./products/entities");
const RenameEntities_1 = require("./migrations/RenameEntities");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    entities: [entities_1.Product, entities_1.ProductImage],
    migrations: [RenameEntities_1.RenameEntities1678662448088],
});
//# sourceMappingURL=typeOrm.config.js.map