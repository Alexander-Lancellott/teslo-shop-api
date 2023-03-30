/// <reference types="node" />
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, ChangeRolesAndStatusDto } from './dto';
import { User } from './entities/user.entity';
import { IncomingHttpHeaders } from 'http';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<{
        token: string;
        id: string;
        email: string;
        password: string;
        fullName: string;
        isActive: boolean;
        roles: string[];
        products: import("../products/entities").Product;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        id: string;
        email: string;
        token: string;
    }>;
    checkStatus(user: User): Promise<{
        token: string;
        id: string;
        email: string;
        password: string;
        fullName: string;
        isActive: boolean;
        roles: string[];
        products: import("../products/entities").Product;
    }>;
    changeRolesAndStatus(userId: string, changeRolesAndStatusDto: ChangeRolesAndStatusDto): Promise<User>;
    testingPrivateRoute(user: User, user2: User, rawHeaders: string[], headers: IncomingHttpHeaders): {
        user: User;
        user2: User;
        rawHeaders: string[];
        headers: IncomingHttpHeaders;
    };
    testingPrivateRoute2(user: User): {
        user: User;
    };
    testingPrivateRoute3(user: User): {
        user: User;
    };
}
