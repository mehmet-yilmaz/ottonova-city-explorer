import { ApiProperty } from '@nestjs/swagger';
import { City } from '../models/city.entity';

export class CityRankingsDto {
  @ApiProperty({
    example: 'population',
    description: 'Sorting criteria (e.g., population, founded)',
  })
  sortBy: string;

  @ApiProperty({
    example: 'DESC',
    description: 'Sorting order (ASC or DESC)',
  })
  order: 'ASC' | 'DESC';

  @ApiProperty({ type: [City], description: 'Top ranked cities' })
  cities: City[];
}
