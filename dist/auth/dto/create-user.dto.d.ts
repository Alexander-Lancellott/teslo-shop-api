import { User } from '../entities/user.entity';
export declare class CreateUser {
    email: string;
    password: string;
    fullName: string;
    secret?: string;
}
declare const CreateUserDto_base: import("@nestjs/mapped-types").MappedType<CreateUser & Omit<User, "products" | "id" | "password" | "isActive" | "roles" | "checkFields">>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};
