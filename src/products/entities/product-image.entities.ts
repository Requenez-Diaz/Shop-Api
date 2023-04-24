import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entities';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  //relacion de muchos a uno
  //muchas imagenes pueden ser de un product
  @ManyToOne(() => Product, (product) => product.image)
  product: Product;
}
