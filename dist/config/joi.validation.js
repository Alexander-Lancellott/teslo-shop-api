"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiValidationSchema = void 0;
const Joi = require("joi");
exports.JoiValidationSchema = Joi.object({
    DB_PASSWORD: Joi.string(),
    DB_NAME: Joi.string(),
    DB_HOST: Joi.string(),
    DB_PORT: Joi.number(),
    DB_USERNAME: Joi.string(),
    DB_SYNCHRONIZE: Joi.boolean().default(false),
    PORT: Joi.number().default(3000),
    HOST_API: Joi.string(),
    JWT_SECRET: Joi.string(),
    SECRET: Joi.string(),
    STAGE: Joi.string().valid('dev', 'prod'),
    SWAGGER_UPDATE: Joi.boolean().default('false'),
});
//# sourceMappingURL=joi.validation.js.map