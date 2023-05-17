import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { createProductsDto } from './dto/products.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly shopServiceRepo: ProductService) {}

  @Post()
  create(@Body() productDto: createProductsDto) {
    return this.shopServiceRepo.create(productDto);
  }

  @Get()
  findAll() {
    return this.shopServiceRepo.findAll();
  }

  // @Post(':id/images')
  // async addProductImageById(
  //   @Param('id') productId: string,
  //   @Body() body: { imageUrl: string },
  // ) {
  //   const product = await this.shopServiceRepo.addProductImageById(
  //     parseInt(productId),
  //     body.imageUrl,
  //   );
  //   return product;
  // }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.shopServiceRepo.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.shopServiceRepo.remove(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeDto: createProductsDto,
  ) {
    //const updatedProduct = await this.shopServiceRepo.update(id, changeDto);
    return this.shopServiceRepo.update(id, changeDto);
  }
}
