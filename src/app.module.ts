import { FilesModule } from './files/files.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './products/product.module';
import { SizeModule } from './size/size.module';


@Module({
  imports: [
    FilesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ShopModule,
    SizeModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
