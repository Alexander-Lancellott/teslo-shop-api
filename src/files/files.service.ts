import { join } from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  private host: string;
  private stage: string;

  constructor(private readonly configService: ConfigService) {
    this.host = configService.getOrThrow('HOST_API');
    this.stage = configService.getOrThrow('STAGE');
  }

  uploadFile(file: Express.Multer.File) {
    const secureUrl = `${this.host}/files/product/${file.filename}`;
    return { secureUrl };
  }

  getStaticProductImage(image: string) {
    const path =
      this.stage === 'prod'
        ? `/tmp/${image}`
        : join(process.cwd(), '/static/products', image);
    console.log(path);
    if (!existsSync(path))
      throw new NotFoundException(`No product found with image '${image}'`);

    return path;
  }
}
