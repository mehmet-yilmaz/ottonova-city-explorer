import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './models/city.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityRankingsDto } from './dto/ciy-rankings.dto';
import { CityStatsDto } from './dto/city-stats.dto';
// import { CityStatsDto } from './dto/city-stats.dto';
// import { CityRankingsDto } from './dto/ciy-rankings.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private readonly cities: Repository<City>,
  ) {}

  /**
   * Retrieves a list of cities with optional filtering, sorting, and pagination.
   *
   * @param country - Filter by country name (optional).
   * @param continent - Filter by continent (optional).
   * @param minPopulation - Minimum population filter (optional).
   * @param maxPopulation - Maximum population filter (optional).
   * @param landmark - Filter by specific landmark (optional).
   * @param page - Page number for pagination (default: 1).
   * @param limit - Number of cities per page (default: 10).
   * @param sortBy - Field to sort by (default: "name").
   * @param order - Sorting order (ASC or DESC, default: ASC).
   * @returns A paginated list of cities matching the given criteria.
   */
  async findAll(
    country?: string,
    continent?: string,
    minPopulation?: number,
    maxPopulation?: number,
    landmark?: string,
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'name',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ data: City[]; total: number; page: number; limit: number }> {
    const query = this.cities.createQueryBuilder('city');

    // Dynamic filtering conditions regarding to provided query parameters
    if (country) {
      query.andWhere('city.country ILIKE :country', {
        country: `%${country}%`, //Case-Insensitive search
      });
    }

    if (continent) {
      query.andWhere('city.continent ILIKE :continent', {
        continent: `%${continent}%`,
      });
    }

    if (minPopulation) {
      query.andWhere('city.population >= :minPopulation', { minPopulation });
    }

    if (maxPopulation) {
      query.andWhere('city.population <= :maxPopulation', { maxPopulation });
    }

    // Checks if provided landmark exist in the landmark array of the city
    if (landmark) {
      query.andWhere(':landmark = ANY(city.landmarks)', { landmark });
    }

    // Validate sortBy field to prevent SQL injection
    const allowedSortFields = ['name', 'population', 'founded'];
    if (!allowedSortFields.includes(sortBy)) {
      sortBy = 'name';
    }

    // Validate order field
    const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // Get total count (without pagination)
    const total = await query.getCount();

    // Apply sorting & pagination
    const data = await query
      .orderBy(`city.${sortBy}`, sortOrder)
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const city = await this.cities.findOne({ where: { id } });
    if (!city) this.notFound(id);
    return city;
  }

  async create(dto: CreateCityDto) {
    const city = this.cities.create(dto);
    return await this.cities.save(city);
  }
  async update(id: number, dto: UpdateCityDto) {
    await this.cities.update(id, dto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.cities.delete(id);
    if (!result.affected) this.notFound(id);
    return;
  }

  async getCityStats(): Promise<CityStatsDto> {
    const totalCities = await this.cities.count();

    // Get the total number of cities per continent
    const rawCitiesPerContinent: { continent: string; count: any }[] =
      await this.cities
        .createQueryBuilder('city')
        .select('city.continent', 'continent')
        .addSelect('COUNT(city.id)', 'count')
        .groupBy('city.continent')
        .getRawMany();

    console.log(rawCitiesPerContinent);
    const citiesPerContinent: { continent: string; count: number }[] =
      rawCitiesPerContinent.map((row) => ({
        continent: row.continent,
        count: +row.count,
      }));

    // Get the average population per continent
    const rawAvgPopulationPerContinent: {
      continent: string;
      avgPopulation: any;
    }[] = await this.cities
      .createQueryBuilder('city')
      .select('city.continent', 'continent')
      .addSelect('AVG(city.population)', 'avgPopulation')
      .groupBy('city.continent')
      .getRawMany();
    console.log(rawAvgPopulationPerContinent);
    const avgPopulationPerContinent: {
      continent: string;
      avgPopulation: number;
    }[] = rawAvgPopulationPerContinent.map((row) => ({
      continent: row.continent,
      avgPopulation: +row.avgPopulation,
    }));

    // Get the top 10 most populous cities
    const topCities = await this.cities.find({
      order: { population: 'DESC' },
      take: 10,
    });

    return {
      totalCities,
      citiesPerContinent,
      avgPopulationPerContinent,
      topCities,
    };
  }

  async getCityRankings(
    sortBy: string = 'population',
    order: 'ASC' | 'DESC' = 'DESC',
  ): Promise<CityRankingsDto> {
    const allowedSortFields = ['population', 'founded'];
    if (!allowedSortFields.includes(sortBy)) {
      sortBy = 'population';
    }

    const cities = await this.cities.find({
      order: { [sortBy]: order },
      take: 10,
    });

    return { sortBy, order, cities };
  }

  private notFound(id: number) {
    throw new NotFoundException(
      `City with ID: ${id} could not found!\nPlease re-check your given ID if it exist.`,
    );
  }
}
