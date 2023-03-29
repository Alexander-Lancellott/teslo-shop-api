import {
  Controller,
  Post,
  Get,
  Param,
  //ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { FilesService } from './files.service';
import { imageOptions } from './helpers/imageOptions';
import {
  ApiUploadImageResponse,
  ApiGetImageResponse,
} from './decorators/file-response.decorator';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('product/:image')
  @ApiGetImageResponse()
  getImage(
    @Res() res: Response,
    @Param('image')
    image: string,
  ) {
    const path = this.filesService.getStaticProductImage(image);
    return res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', imageOptions))
  @ApiUploadImageResponse()
  async uploadProductImage(
    @UploadedFile(
      new ParseFilePipe() /*new ParseFilePipeBuilder().addFileTypeValidator({fileType: 'jpg|jpeg|png|gif',}).build(),*/,
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.uploadFile(file);
  }
}
