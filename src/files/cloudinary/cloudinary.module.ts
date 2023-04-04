import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import Datauri from 'datauri/parser';

@Module({
  providers: [CloudinaryService, Datauri],
  exports: [CloudinaryService, Datauri],
})
export class CloudinaryModule {}
