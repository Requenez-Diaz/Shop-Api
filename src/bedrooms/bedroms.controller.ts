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
import { createBedroomsDto } from './dto/bedrooms.dto';
import { HotelService } from './bedrooms.service';

@Controller('bedrooms')
export class HotelController {
  constructor(private readonly hotServiseDto: HotelService) {}

  @Post()
  create(@Body() hotelDto: createBedroomsDto) {
    return this.hotServiseDto.create(hotelDto);
  }

  @Get()
  findAll() {
    return this.hotServiseDto.findAll();
  }
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotServiseDto.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotServiseDto.remove(id);
  }

  @Patch(':id')
  updateHotel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeDto: createBedroomsDto,
  ) {
    return this.hotServiseDto.update(id, changeDto);
  }
}
