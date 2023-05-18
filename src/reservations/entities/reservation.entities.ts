import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservations } from './reservations-image.entities';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric' })
  startDate: number;

  @Column({ type: 'numeric' })
  endDate: number;

  @Column({ type: 'text' })
  order: string;

  @Column({ type: 'numeric' })
  client_id: number;

  @Column({ type: 'numeric' })
  habitacion_id: number;

  @OneToMany(
    () => Reservations,
    (reservationHab) => reservationHab.reservations,
    {
      cascade: true,
      eager: true,
    },
  )
  image?: Reservations[];
}
