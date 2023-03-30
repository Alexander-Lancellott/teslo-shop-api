import { User } from '../entities/user.entity';
type UserMapped = Exclude<keyof User, 'password' | 'checkFields'>;
export declare const GetUser: (...dataOrPipes: (UserMapped | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
export {};
