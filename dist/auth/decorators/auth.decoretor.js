"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_role_guard_1 = require("../guards/user-role/user-role.guard");
const role_proctected_decorator_1 = require("./role-proctected.decorator");
const Auth = (...roles) => {
    return (0, common_1.applyDecorators)((0, role_proctected_decorator_1.RoleProctected)(...roles), (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), user_role_guard_1.UserRoleGuard));
};
exports.Auth = Auth;
//# sourceMappingURL=auth.decoretor.js.map