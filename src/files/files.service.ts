import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  staticProductImage(ImageName: string) {
    const path = join(__dirname, '../../uploads/products', ImageName);

    if (!existsSync(path)) {
      throw new BadRequestException(`Could not find product ${ImageName}`);
    }
    return path;
  }
}
