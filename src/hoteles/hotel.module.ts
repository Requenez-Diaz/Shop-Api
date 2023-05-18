import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotels } from './entities/hotel.entities';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { HotImage } from './entities/hotel-image.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Hotels, HotImage])],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
