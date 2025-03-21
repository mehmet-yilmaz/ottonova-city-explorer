import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CitiesService } from './cities/cities.service';
import { CreateCityDto } from './cities/dto/create-city.dto';
import citiesJson from './data/cities.json';

interface ICities {
  cities: {
    name: string;
    name_native: string;
    country: string;
    continent: string;
    latitude: number | string;
    longitude: number | string;
    population: number | string;
    founded: number | string;
    landmarks: string[];
  }[];
}

const citiesData: ICities = citiesJson as ICities;

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const citiesService = app.get(CitiesService);

  for (const city of citiesData.cities) {
    const cityDto: CreateCityDto = {
      name: city.name,
      name_native: city.name_native,
      country: city.country,
      continent: city.continent,
      latitude: Number(city.latitude), // Convert string to number
      longitude: Number(city.longitude),
      population: Number(city.population),
      founded: Number(city.founded),
      landmarks: city.landmarks,
    };

    await citiesService.create(cityDto);
  }

  console.log('✅ Database seeding completed successfully.');
  console.log(`📌 ${citiesData.cities.length} cities added.`);
  console.log('🚀 Backend is ready to start.');
  await app.close();
}

bootstrap();
