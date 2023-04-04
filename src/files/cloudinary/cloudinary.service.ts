import { Injectable } from '@nestjs/common';
import { ConfigOptions, v2 as cloudinary } from 'cloudinary';
import { cloudinaryFolder, cloudinaryOptions } from '../helpers/imageOptions';
import { ConfigService } from '@nestjs/config';
import Datauri from 'datauri/parser';
import path from 'path';
import { Helper } from '../../common/helper/helper';

@Injectable()
export class CloudinaryService {
  private config: ConfigOptions;
  protected helper: Helper;
  constructor(
    private readonly configService: ConfigService,
    private readonly dUri: Datauri,
  ) {
    this.config = cloudinary.config({
      cloud_name: configService.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.getOrThrow<string>('CLOUDINARY_API_KEY'),
      api_secret: configService.getOrThrow<string>('CLOUDINARY_API_SECRET'),
    });
    this.helper = new Helper();
  }
  async upload(file: Express.Multer.File) {
    try {
      const fileUri = this.dUri.format(
        path.extname(file?.originalname || '').toString(),
        file?.buffer || '',
      );
      return await cloudinary.uploader.upload(
        fileUri.content,
        cloudinaryOptions(file),
      );
    } catch (error) {
      this.helper.handleDBExceptions(error);
    }
  }

  async delete(public_id = '') {
    try {
      await cloudinary.uploader.destroy(public_id);
    } catch (error) {
      this.helper.handleDBExceptions(error);
    }
  }

  async deleteAll() {
    try {
      await cloudinary.api.delete_resources_by_prefix(`${cloudinaryFolder}/`);
    } catch (error) {
      this.helper.handleDBExceptions(error);
    }
  }
}
