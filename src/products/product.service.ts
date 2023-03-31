import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entities';
import { Repository } from 'typeorm';
import { createProductsDto } from './dto/products.dto';
import { find } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly shopRepository: Repository<Product>,
  ) {}

  async create(shopDto: createProductsDto) {
    const shop = this.shopRepository.create(shopDto);
    await this.shopRepository.save(shop);

    return shop;
  }

  findAll() {
    return this.shopRepository.find();
  }

  //Metodo para visualizar un producto
  findOne(id: string) {
    return this.shopRepository.findOneBy({ id });
  }

  //eliminar productos

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.shopRepository.remove(product);
    return `producto eliminado`;
  }

  async update(id: string, changeDto: createProductsDto) {
    const findProduct = await this.findOne(id);
    const updateProduct = await this.shopRepository.merge(
      findProduct,
      changeDto,
    );

    return this.shopRepository.update(id, updateProduct);
  }
}
