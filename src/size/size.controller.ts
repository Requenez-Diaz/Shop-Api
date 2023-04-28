import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';

import { createSizeDto } from './dto/size.dto';
import { SizeService } from './size.service';
@Controller('size')
export class SizeController {

    constructor(private readonly sizeServiceRepo: SizeService) { }

    @Post()
    create(@Body() productDto: createSizeDto) {
        return this.sizeServiceRepo.create(productDto);
    }

    @Get()
    findAll() {
        return this.sizeServiceRepo.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.sizeServiceRepo.findOne(id);
    }

    @Delete(':id')
    deleteOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.sizeServiceRepo.remove(id);
    }

    @Patch(':id')
    updateProduct(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() changeDto: createSizeDto,
    ) {
        //const updatedProduct = await this.sizeServiceRepo.update(id, changeDto);
        return this.sizeServiceRepo.update(id, changeDto);
    }
}
