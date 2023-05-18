import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class createBedroomsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  nameHotel: string;

  @IsNumber()
  @IsOptional()
  bedroomsNumber?: number;

  @IsString()
  @IsNotEmpty()
  type?: string;

  @IsNumber()
  @IsNotEmpty()
  size?: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  image?: string[];
}
