import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entities';
import { ProductsController } from './products.controller';
import { ProductService } from './product.service';
import { ProductImage } from './entities/product-image.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ShopModule {}
