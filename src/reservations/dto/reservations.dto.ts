import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class createReservationsDto {
  @IsNumber()
  @IsNotEmpty()
  startDate: number;

  @IsNumber()
  @IsOptional()
  endDate: number;

  @IsString()
  @IsOptional()
  order: string;

  @IsNumber()
  @IsOptional()
  client_id: number;

  @IsNumber()
  @IsOptional()
  habitacion_id: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  image?: string[];
}
