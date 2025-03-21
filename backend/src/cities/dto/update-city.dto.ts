import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @ApiPropertyOptional({ example: 'Berlin', description: 'Updated city name' })
  name?: string;

  @ApiPropertyOptional({
    example: 'Berlin',
    description: 'Updated native name of the city',
  })
  name_native?: string;

  @ApiPropertyOptional({ example: 'Germany', description: 'Updated country' })
  country?: string;

  @ApiPropertyOptional({ example: 'Europe', description: 'Updated continent' })
  continent?: string;

  @ApiPropertyOptional({ example: 52.52, description: 'Updated latitude' })
  latitude?: number;

  @ApiPropertyOptional({ example: 13.405, description: 'Updated longitude' })
  longitude?: number;

  @ApiPropertyOptional({ example: 4000000, description: 'Updated population' })
  population?: number;

  @ApiPropertyOptional({ example: 1200, description: 'Updated founding year' })
  founded?: number;

  @ApiPropertyOptional({
    example: ['Brandenburg Gate', 'Berlin TV Tower'],
    description: 'Updated landmarks',
  })
  landmarks?: string[];
}
