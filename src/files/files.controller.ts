import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFIlter.helpers';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }
  @Post('product')
  @UseInterceptors(
    FileInterceptor('file',
      {
        fileFilter: fileFilter,
        //definir donde se va a guardar el archivo
        storage: diskStorage({
          destination: './uploads/products',
          filename: fileNamer,
          // filename: (req, file, cb) => {
          //   cb(null, file.originalname);
          // }
        })
      })
  )
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    //si no viene la imagen que se mande el siguiente mensaje
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return { fileName: file.originalname }
  }
}
