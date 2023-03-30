/// <reference types="multer" />
import { Response } from 'express';
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    getImage(res: Response, image: string): void;
    uploadProductImage(file: Express.Multer.File): Promise<{
        secureUrl: string;
    }>;
}
