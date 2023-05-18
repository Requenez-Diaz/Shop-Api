import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BedroomsImage as HotelImage } from './bedrooms-image.entities';

@Entity()
export class Bedrooms {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nameHotel: string;

  @Column({ type: 'numeric' })
  bedroomsNumber: number;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'numeric' })
  size: number;

  //relaciones de uno a muchos

  @OneToMany(() => HotelImage, (hotelImage) => hotelImage.hotel, {
    cascade: true,
    eager: true,
  })
  image?: HotelImage[];
}
