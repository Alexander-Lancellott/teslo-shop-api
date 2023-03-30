import { SeedService } from './seed.service';
import { SeedDto } from './dto/seed.dto';
export declare class SeedController {
    private readonly seedService;
    constructor(seedService: SeedService);
    executedSeed(seedDto: SeedDto): Promise<{
        message: string;
    }>;
}
