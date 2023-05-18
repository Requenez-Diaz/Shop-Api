import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class createHotelDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsNumber()
  @IsOptional()
  phone?: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  image?: string[];
}
