import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSize } from './product.size';

@Entity()
export class Size {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'numeric' })
  width: number;

  @Column({ type: 'numeric' })
  height: number;

  @Column({ type: 'numeric' })
  units: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  is_active: string;

  @OneToMany(() => ProductSize, (sizeImage) => sizeImage.product, {
    cascade: true,
    eager: true,
  })
  product?: ProductSize[];
}
