import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './models/city.entity';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CityStatsDto } from './dto/city-stats.dto';
import { CityRankingsDto } from './dto/ciy-rankings.dto';

@ApiTags('Cities')
@Controller()
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}
  @ApiOperation({
    summary: 'Get all cities with filtering, sorting, and pagination',
  })
  @ApiQuery({ name: 'country', required: false, example: 'Germany' })
  @ApiQuery({ name: 'continent', required: false, example: 'Europe' })
  @ApiQuery({ name: 'minPopulation', required: false, example: 1000000 })
  @ApiQuery({ name: 'maxPopulation', required: false, example: 5000000 })
  @ApiQuery({ name: 'landmark', required: false, example: 'Brandenburg Gate' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    example: 'population',
    enum: ['name', 'population', 'founded'],
  })
  @ApiQuery({
    name: 'order',
    required: false,
    example: 'DESC',
    enum: ['ASC', 'DESC'],
  })
  @Get()
  findAll(
    @Query('country') country?: string,
    @Query('continent') continent?: string,
    @Query('minPopulation') minPopulation?: string,
    @Query('maxPopulation') maxPopulation?: string,
    @Query('landmark') landmark?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('sortBy') sortBy: string = 'name',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ data: City[]; total: number; page: number; limit: number }> {
    return this.citiesService.findAll(
      country,
      continent,
      minPopulation ? Number(minPopulation) : undefined,
      maxPopulation ? Number(maxPopulation) : undefined,
      landmark,
      Number(page),
      Number(limit),
      sortBy,
      order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
    );
  }

  @ApiOperation({ summary: 'Get City Statistics' })
  @ApiOkResponse({ type: CityStatsDto })
  @Get('stats')
  async getCityStats() {
    return await this.citiesService.getCityStats();
  }

  @ApiOperation({ summary: 'Get City Rankings' })
  @ApiOkResponse({ type: CityRankingsDto })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    example: 'population',
    enum: ['name', 'population', 'founded'],
  })
  @ApiQuery({
    name: 'order',
    required: false,
    example: 'DESC',
    enum: ['ASC', 'DESC'],
  })
  @Get('rankings')
  async getCityRankings(
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'ASC' | 'DESC',
  ) {
    return await this.citiesService.getCityRankings(sortBy, order);
  }

  @ApiOperation({ summary: 'Get a city by ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.citiesService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new city' })
  @Post()
  async create(@Body() dto: CreateCityDto) {
    return await this.citiesService.create(dto);
  }

  @ApiOperation({ summary: 'Update an existing city' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCityDto,
  ) {
    return await this.citiesService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a city' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.citiesService.remove(id);
  }
}
