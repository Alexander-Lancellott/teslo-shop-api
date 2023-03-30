import { ValidRoles } from '../interfaces';
export declare const META_ROLES = "roles";
export declare const RoleProctected: (...args: ValidRoles[]) => import("@nestjs/common").CustomDecorator<string>;
