import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import { Size } from './entities/size.entities';
import { ProductSize } from './entities/product.size';

@Module({
    imports: [TypeOrmModule.forFeature([Size, ProductSize])],
    controllers: [SizeController],
    providers: [SizeService],
})
export class SizeModule { }
