"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformToBoolean = void 0;
const class_transformer_1 = require("class-transformer");
const validationOptions = {
    true: ['true', '1'],
    false: ['false', '0'],
};
const TransformToBoolean = (validation = validationOptions) => {
    return (0, class_transformer_1.Transform)(({ obj, key }) => {
        const value = obj[key];
        if (typeof value === 'string') {
            if (validation.true.includes(obj[key].toLowerCase()))
                return true;
            else if (validation.false.includes(obj[key].toLowerCase()))
                return false;
            else
                return '';
        }
        return value;
    });
};
exports.TransformToBoolean = TransformToBoolean;
//# sourceMappingURL=transformToBoolean.js.map