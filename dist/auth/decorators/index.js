"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleProctected = exports.GetUser = exports.Auth = exports.ApiPropertyPassword = exports.ApiChangeRolesAndStatusResponse = exports.ApiCheckStatusResponse = exports.ApiLoginResponse = exports.ApiRegisterResponse = void 0;
var auth_response_decorator_1 = require("./auth-response.decorator");
Object.defineProperty(exports, "ApiRegisterResponse", { enumerable: true, get: function () { return auth_response_decorator_1.ApiRegisterResponse; } });
Object.defineProperty(exports, "ApiLoginResponse", { enumerable: true, get: function () { return auth_response_decorator_1.ApiLoginResponse; } });
Object.defineProperty(exports, "ApiCheckStatusResponse", { enumerable: true, get: function () { return auth_response_decorator_1.ApiCheckStatusResponse; } });
Object.defineProperty(exports, "ApiChangeRolesAndStatusResponse", { enumerable: true, get: function () { return auth_response_decorator_1.ApiChangeRolesAndStatusResponse; } });
var password_decorator_1 = require("./password.decorator");
Object.defineProperty(exports, "ApiPropertyPassword", { enumerable: true, get: function () { return password_decorator_1.ApiPropertyPassword; } });
var auth_decoretor_1 = require("./auth.decoretor");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return auth_decoretor_1.Auth; } });
var get_user_decorator_1 = require("./get-user.decorator");
Object.defineProperty(exports, "GetUser", { enumerable: true, get: function () { return get_user_decorator_1.GetUser; } });
var role_proctected_decorator_1 = require("./role-proctected.decorator");
Object.defineProperty(exports, "RoleProctected", { enumerable: true, get: function () { return role_proctected_decorator_1.RoleProctected; } });
//# sourceMappingURL=index.js.map