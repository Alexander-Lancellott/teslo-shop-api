import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, ChangeRolesAndStatusDto } from './dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly configService;
    private helper;
    private secret;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    private getJwtToken;
    create(createUserDto: CreateUserDto): Promise<{
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
    login(loginUserDto: LoginUserDto): Promise<{
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
}
