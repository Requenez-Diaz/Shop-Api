import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createSizeDto } from './dto/size.dto';
import { ProductSize } from './entities/product.size';
import { Size } from './entities/size.entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly shopRepository: Repository<Size>,

    @InjectRepository(ProductSize)
    private readonly productImageRepository: Repository<ProductSize>,

    private readonly dataSource: DataSource,
  ) {}

  // async create(shopDto: createProductsDto) {
  //   const shop = this.shopRepository.create(shopDto);
  //   await this.shopRepository.save(shop);

  //   return shop;
  // }

  async create(shopDto: createSizeDto) {
    const { inventory = [], ...detailProduct } = shopDto;
    const product = await this.shopRepository.create({
      ...detailProduct,
      product: inventory.map((image) =>
        this.productImageRepository.create({ brands: image }),
      ),
    });

    await this.shopRepository.save(product);
    return product;
  }

  findAll() {
    return this.shopRepository.find({ relations: ['image'] });
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

  // async update(id: string, changeDto: createProductsDto) {
  //   const findProduct = await this.findOne(id);
  //   const updateProduct = await this.shopRepository.merge(
  //     findProduct,
  //     changeDto,
  //   );

  //   return this.shopRepository.update(id, updateProduct);
  // }

  async update(id: string, changeDto: createSizeDto) {
    const { inventory, ...updateAll } = changeDto;
    const product = await this.shopRepository.preload({
      id: id,
      ...updateAll,
      product: [],
    });

    //consultar a la base de datos para la modification
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    await queryRunner.connect();

    //se agregan imagenes de
    if (product) {
      await queryRunner.manager.delete(ProductSize, { product: { id } });

      product.product = await inventory.map((valorImage) =>
        this.productImageRepository.create({ brands: valorImage }),
      );
    } else {
      product.product = await this.productImageRepository.findBy({
        product: { id },
      });
    }

    //Salvamos y cerramos la consurlta
    await queryRunner.manager.save(product);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return product;
  }
}
