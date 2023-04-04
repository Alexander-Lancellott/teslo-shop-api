import { Injectable, OnModuleInit } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { cloudinaryFolder } from './helpers/imageOptions';
import { User } from '../auth/entities/user.entity';
import { ProductsService } from '../products/products.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class FilesService implements OnModuleInit {
  private productsService: ProductsService;
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    this.productsService = await this.moduleRef.create(ProductsService);
  }

  async uploadImages(images: Express.Multer.File[], id: string, user: User) {
    const secure_urls: string[] = [];
    const uploadAll = async () => {
      for (const image of images) {
        const { secure_url } = await this.cloudinaryService.upload(image);
        secure_urls.push(secure_url);
      }
      return secure_urls;
    };

    const deleteImages = async (urls: string[]) => {
      await this.deleteImages(urls);
    };

    return await this.productsService.update({
      id,
      user,
      uploadAll: uploadAll,
      deleteImages: deleteImages,
      updateProductDto: {},
    });
  }

  async deleteImages(secure_urls: string[]) {
    if (secure_urls && secure_urls.length > 0) {
      for (const url of secure_urls) {
        const public_id = `${cloudinaryFolder}/${url.split('/').pop()}`.split(
          '.',
        )[0];
        await this.cloudinaryService.delete(public_id);
      }
    }
  }

  async deleteAll() {
    await this.cloudinaryService.deleteAll();
  }
}
