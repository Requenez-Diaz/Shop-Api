import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bedrooms } from './entities/bedrooms.entities';
import { HotelController } from './bedroms.controller';
import { HotelService } from './bedrooms.service';
import { BedroomsImage } from './entities/bedrooms-image.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Bedrooms, BedroomsImage])],
  controllers: [HotelController],
  providers: [HotelService],
})
export class BedroomsModule {}
