import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Hotels } from './hotel.entities';

@Entity()
export class HotImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  //relacion de muchos a uno
  //muchas imagenes pueden ser de un hoteles
  @ManyToOne(() => Hotels, (hoteles) => hoteles.image, { onDelete: 'CASCADE' })
  hotel: Hotels;
}
