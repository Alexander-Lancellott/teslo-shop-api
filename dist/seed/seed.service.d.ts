import { SeedDto } from './dto/seed.dto';
import { ProductsService } from '../products/products.service';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare class SeedService {
    private readonly productsService;
    private readonly configService;
    private readonly userRepository;
    private secret;
    constructor(productsService: ProductsService, configService: ConfigService, userRepository: Repository<User>);
    runSeed({ hard, secret }: SeedDto): Promise<{
        message: string;
    }>;
    private insertUsers;
    private deleteTables;
    private insertNewProducts;
}
