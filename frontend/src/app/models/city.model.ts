import { CityDTO } from './city.dto';

export class City {
  constructor(
    public id: number,
    public name: string,
    public name_native: string,
    public country: string,
    public continent: string,
    public population: number,
    public latitude: number,
    public longitude: number,
    public founded: number,
    public landmarks: string[]
  ) {}

  static fromDTO(dto: CityDTO): City {
    return new City(
      dto.id,
      dto.name,
      dto.name_native,
      dto.country,
      dto.continent,
      dto.population,
      dto.latitude,
      dto.longitude,
      dto.founded,
      dto.landmarks
    );
  }
}
