import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HotImage as HotelImage } from './hotel-image.entities';

@Entity()
export class Hotels {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'numeric' })
  phone: number;

  //relaciones de uno a muchos

  @OneToMany(() => HotelImage, (hotelImage) => hotelImage.hotel, {
    cascade: true,
    eager: true,
  })
  image?: HotelImage[];
}
