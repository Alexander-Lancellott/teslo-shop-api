/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
export declare class FilesService {
    private readonly configService;
    private host;
    private stage;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): {
        secureUrl: string;
    };
    getStaticProductImage(image: string): string;
}
