import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  controllers: [],
  providers: [],
})
export class ShopModule {}
