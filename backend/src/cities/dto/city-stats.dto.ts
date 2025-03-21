import { ApiProperty } from '@nestjs/swagger';
import { City } from '../models/city.entity';

export class CityStatsDto {
  @ApiProperty({ example: 200, description: 'Total number of cities' })
  totalCities: number;

  @ApiProperty({
    example: [{ continent: 'Europe', count: 50 }],
    description: 'Number of cities per continent',
  })
  citiesPerContinent: {
    continent: string;
    count: number;
  }[];

  @ApiProperty({
    example: [{ continent: 'Europe', avgPopulation: 1200000 }],
    description: 'Average population per continent',
  })
  avgPopulationPerContinent: {
    continent: string;
    avgPopulation: number;
  }[];

  @ApiProperty({ type: [City], description: 'Top 10 most populous cities' })
  topCities: City[];
}
