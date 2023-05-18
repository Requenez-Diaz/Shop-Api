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
import { createReservationsDto } from './dto/reservations.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservation')
export class ReservationsController {
  constructor(private readonly reservaRepoDto: ReservationsService) {}

  @Post()
  create(@Body() reservaDto: createReservationsDto) {
    return this.reservaRepoDto.create(reservaDto);
  }

  @Get()
  findAll() {
    return this.reservaRepoDto.findAll();
  }
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.reservaRepoDto.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.reservaRepoDto.remove(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeRe: createReservationsDto,
  ) {
    return this.reservaRepoDto.update(id, changeRe);
  }
}
