import { BadRequestException } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

const fileType = '(jpg|jpeg|png|gif)';

const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error, fileName: string) => void,
) => {
  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${fileExtension}`;

  return callback(null, fileName);
};

const imageFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.match(fileType))
    return callback(
      new BadRequestException(
        `Validation failed (expected type is ${fileType})`,
      ),
      false,
    );
  return callback(null, true);
};

export const imageOptions: MulterModuleOptions = {
  fileFilter: imageFilter,
  storage: diskStorage({
    destination: './static/products',
    filename: fileNamer,
  }),
};
