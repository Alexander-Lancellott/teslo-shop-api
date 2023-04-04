import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'file', format: 'binary', isArray: true })
  images: Express.Multer.File[];
}
