import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entities';
import { DataSource, Repository } from 'typeorm';
import { createReservationsDto } from './dto/reservations.dto';
import { find } from 'rxjs';
import { Reservations } from './entities/reservations-image.entities';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly shopRepository: Repository<Reservation>,

    @InjectRepository(Reservations)
    private readonly reservaIngRepo: Repository<Reservations>,

    private readonly dataSource: DataSource,
  ) {}

  async create(shopDto: createReservationsDto) {
    const { image = [], ...detailReservation } = shopDto;
    const reservation = await this.shopRepository.create({
      ...detailReservation,
      image: image.map((image) => this.reservaIngRepo.create({ url: image })),
    });

    await this.shopRepository.save(reservation);
    return reservation;
  }

  findAll() {
    return this.shopRepository.find({ relations: ['image'] });
  }

  findOne(id: string) {
    return this.shopRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const reservation = await this.findOne(id);
    await this.shopRepository.remove(reservation);
    return `reserva eliminada`;
  }
  async update(id: string, resDto: createReservationsDto) {
    const { image, ...updateAll } = resDto;
    const reservation = await this.shopRepository.preload({
      id: id,
      ...updateAll,
      image: [],
    });

    //consultar a la base de datos para la modification
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    await queryRunner.connect();

    //se agregan imagenes de
    if (image) {
      await queryRunner.manager.delete(Reservations, { reservation: { id } });

      reservation.image = await image.map((valorImage) =>
        this.reservaIngRepo.create({ url: valorImage }),
      );
    } else {
      reservation.image = await this.reservaIngRepo.findBy({
        reservations: { id },
      });
    }
    //Salvamos y cerramos la consurlta
    await queryRunner.manager.save(reservation);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return reservation;
  }
}
