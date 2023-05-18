import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { createHotelDto } from './dto/hoteles.dto';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotServiceRepo: HotelService) {}

  @Post()
  create(@Body() hotelDto: createHotelDto) {
    return this.hotServiceRepo.create(hotelDto);
  }

  @Get()
  findAll() {
    return this.hotServiceRepo.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotServiceRepo.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotServiceRepo.remove(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() hotDto: createHotelDto,
  ) {
    return this.hotServiceRepo.update(id, hotDto);
  }
}
