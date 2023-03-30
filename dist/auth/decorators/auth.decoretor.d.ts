import { ValidRoles } from '../interfaces';
export declare const Auth: (...roles: ValidRoles[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
