import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entities';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservations } from './entities/reservations-image.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Reservations])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
