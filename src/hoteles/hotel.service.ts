import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from './entities/hotel.entities';
import { DataSource, Repository } from 'typeorm';
import { createHotelDto } from './dto/hoteles.dto';
import { find } from 'rxjs';
import { HotImage } from './entities/hotel-image.entities';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotels)
    private readonly hotRepository: Repository<Hotels>,

    @InjectRepository(HotImage)
    private readonly hotelImageRepository: Repository<HotImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(hotDto: createHotelDto) {
    const { image = [], ...hotDetail } = hotDto;
    const hotel = await this.hotRepository.create({
      ...hotDetail,
      image: image.map((image) =>
        this.hotelImageRepository.create({ url: image }),
      ),
    });

    await this.hotRepository.save(hotel);
    return hotel;
  }

  findAll() {
    return this.hotRepository.find({ relations: ['image'] });
  }

  findOne(id: string) {
    return this.hotRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const hotel = await this.findOne(id);
    await this.hotRepository.remove(hotel);
    return `hotel eliminado`;
  }
  async update(id: string, changeDto: createHotelDto) {
    const { image, ...updateAll } = changeDto;
    const hotel = await this.hotRepository.preload({
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
      await queryRunner.manager.delete(HotImage, { hotel: { id } });

      hotel.image = await image.map((valorImage) =>
        this.hotelImageRepository.create({ url: valorImage }),
      );
    } else {
      hotel.image = await this.hotelImageRepository.findBy({
        hotel: { id },
      });
    }

    await queryRunner.manager.save(hotel);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return hotel;
  }
}
