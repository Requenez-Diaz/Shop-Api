import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bedrooms } from './entities/bedrooms.entities';
import { DataSource, Repository } from 'typeorm';
import { createBedroomsDto } from './dto/bedrooms.dto';
import { find } from 'rxjs';
import { BedroomsImage } from './entities/bedrooms-image.entities';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Bedrooms)
    private readonly hotRepository: Repository<Bedrooms>,

    @InjectRepository(BedroomsImage)
    private readonly hotelImgRepository: Repository<BedroomsImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(hotDto: createBedroomsDto) {
    const { image = [], ...detailBed } = hotDto;
    const bedrooms = await this.hotRepository.create({
      ...detailBed,
      image: image.map((image) =>
        this.hotelImgRepository.create({ url: image }),
      ),
    });

    await this.hotRepository.save(bedrooms);
    return bedrooms;
  }

  findAll() {
    return this.hotRepository.find({ relations: ['image'] });
  }
  findOne(id: string) {
    return this.hotRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const bedrooms = await this.findOne(id);
    await this.hotRepository.remove(bedrooms);
    return `Habitacion eliminada`;
  }
  async update(id: string, changesBed: createBedroomsDto) {
    const { image, ...updateAll } = changesBed;
    const bedrooms = await this.hotRepository.preload({
      id: id,
      ...updateAll,
      image: [],
    });

    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    await queryRunner.connect();

    //se agregan imagenes de
    if (image) {
      await queryRunner.manager.delete(BedroomsImage, { bedrooms: { id } });

      bedrooms.image = await image.map((valorImage) =>
        this.hotelImgRepository.create({ url: valorImage }),
      );
    } else {
      bedrooms.image = await this.hotelImgRepository.findBy({
        hotel: { id },
      });
    }
    await queryRunner.manager.save(bedrooms);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return bedrooms;
  }
}
