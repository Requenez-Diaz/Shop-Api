import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Bedrooms } from './bedrooms.entities';

@Entity()
export class BedroomsImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  //relacion de muchos a uno
  //muchas imagenes pueden ser de un bedroom
  @ManyToOne(() => Bedrooms, (bedroom) => bedroom.image, {
    onDelete: 'CASCADE',
  })
  hotel: Bedrooms;
}
