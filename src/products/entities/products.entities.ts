import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './product-image.entities';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ length: 1000 })
  description: string;

  @Column({ type: 'text' })
  slug: string;

  @Column({ type: 'numeric', default: 0, nullable: true })
  stok: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ type: 'varchar', nullable: true })
  filename: string;

  //relaciones de uno a muchos

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  image?: ProductImage[];
}
