import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class createShopDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @MinLength(15)
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  gender?: string;
}
