import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shop {
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
}
