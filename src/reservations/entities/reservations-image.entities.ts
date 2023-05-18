import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entities';

@Entity()
export class Reservations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  //relacion de muchos a uno
  //muchas imagenes pueden ser de un reserva
  @ManyToOne(() => Reservation, (reserva) => reserva.image, {
    onDelete: 'CASCADE',
  })
  reservations: Reservation;
}
