"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleProctected = exports.META_ROLES = void 0;
const common_1 = require("@nestjs/common");
exports.META_ROLES = 'roles';
const RoleProctected = (...args) => {
    return (0, common_1.SetMetadata)(exports.META_ROLES, args);
};
exports.RoleProctected = RoleProctected;
//# sourceMappingURL=role-proctected.decorator.js.map