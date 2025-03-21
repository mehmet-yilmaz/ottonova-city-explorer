import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { Repository } from 'typeorm';
import { City } from './models/city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CitiesService', () => {
  let service: CitiesService;
  let repository: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: getRepositoryToken(City),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    repository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cities', async () => {
    const cities: City[] = [
      { id: 1, name: 'Berlin', country: 'Germany' },
    ] as City[];
    jest.spyOn(repository, 'find').mockResolvedValue(cities);

    expect(await service.findAll()).toEqual(cities);
  });

  it('should find a city by ID', async () => {
    const city: City = { id: 1, name: 'Berlin', country: 'Germany' } as City;
    jest.spyOn(repository, 'findOne').mockResolvedValue(city);

    expect(await service.findOne(1)).toEqual(city);
  });

  it('should create a new city', async () => {
    const city: City = { id: 1, name: 'Berlin', country: 'Germany' } as City;
    jest.spyOn(repository, 'save').mockResolvedValue(city);

    expect(await service.create(city)).toEqual(city);
  });

  it('should update a city', async () => {
    const updatedCity = {
      id: 1,
      name: 'Berlin Updated',
      country: 'Germany',
    } as City;
    jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);
    jest.spyOn(service, 'findOne').mockResolvedValue(updatedCity);

    expect(await service.update(1, updatedCity)).toEqual(updatedCity);
  });

  it('should delete a city', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

    await expect(service.remove(1)).resolves.toBeUndefined();
  });
});
