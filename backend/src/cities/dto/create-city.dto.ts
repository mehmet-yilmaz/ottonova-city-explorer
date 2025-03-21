import { IsString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ example: 'Berlin' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Berlin' })
  @IsString()
  name_native: string;

  @ApiProperty({ example: 'Germany' })
  @IsString()
  country: string;

  @ApiProperty({ example: 'Europe' })
  @IsString()
  continent: string;

  @ApiProperty({ example: 52.52 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 13.405 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: 3769000 })
  @IsNumber()
  population: number;

  @ApiProperty({ example: 1237 })
  @IsNumber()
  founded: number;

  @ApiProperty({ example: ['Brandenburg Gate', 'Berlin TV Tower'] })
  @IsArray()
  landmarks: string[];
}
