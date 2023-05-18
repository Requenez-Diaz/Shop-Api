import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Size } from './size.entities';

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brands: string;

  //relacion de muchos a uno
  //muchas imagenes pueden ser de un product
  @ManyToOne(() => Size, (size) => size.product, { onDelete: 'CASCADE' })
  product: Size;
}
