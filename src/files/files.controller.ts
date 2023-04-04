import {
  Controller,
  Patch,
  Param,
  UploadedFiles,
  UseInterceptors,
  ParseFilePipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { FilesService } from './files.service';
import { imageOptions } from './helpers/imageOptions';
import { ApiUploadImageResponse } from './decorators/file-response.decorator';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Patch('product/:id')
  @Auth()
  @UseInterceptors(FilesInterceptor('images', 4, imageOptions))
  @ApiUploadImageResponse()
  async uploadProductImage(
    @UploadedFiles(new ParseFilePipe()) images: Express.Multer.File[],
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ) {
    return await this.filesService.uploadImages(images, id, user);
  }
}
