import { BadRequestException } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';

const fileType = 'jpg|jpeg|png|gif';

export const cloudinaryFolder = 'Products';

export const cloudinaryOptions = (file?: Express.Multer.File) => {
  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${fileExtension}`;
  return {
    folder: cloudinaryFolder,
    transformation: { quality: 'auto' },
    allowed_formats: fileType.split('|'),
    use_filename: true,
    unique_filename: false,
    filename_override: fileName,
  };
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
};
