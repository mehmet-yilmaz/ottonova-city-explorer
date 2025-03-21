import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { City } from './models/city.entity';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        {
          provide: CitiesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Berlin' }),
            create: jest.fn().mockResolvedValue({ id: 1, name: 'Berlin' }),
            update: jest
              .fn()
              .mockResolvedValue({ id: 1, name: 'Berlin Updated' }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all cities', async () => {
    expect(await controller.findAll()).toEqual([]);
  });

  it('should return a city by ID', async () => {
    expect(await controller.findOne(1)).toEqual({ id: 1, name: 'Berlin' });
  });

  it('should create a city', async () => {
    expect(await controller.create({ name: 'Berlin' } as City)).toEqual({
      id: 1,
      name: 'Berlin',
    });
  });

  it('should update a city', async () => {
    expect(
      await controller.update(1, { name: 'Berlin Updated' } as City),
    ).toEqual({
      id: 1,
      name: 'Berlin Updated',
    });
  });

  it('should delete a city', async () => {
    await expect(controller.remove(1)).resolves.toBeUndefined();
  });
});
