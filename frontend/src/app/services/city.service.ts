import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CityService {
  private http = inject(HttpClient);
  private apiUrl = `http://${environment.apiHost ?? 'localhost:3000'}/cities`; // ✅ Adjust if needed

  // ✅ Reactive Signals for State Management
  cities = signal<City[]>([]);
  totalCities = signal<number>(0);
  limit = signal<number>(10);
  page = signal<number>(1);
  continentList = signal<string[]>([]);
  countryList = signal<string[]>([]);
  cityStats = signal<any>(null);

  displayedColumns = [
    'name',
    'country',
    'continent',
    'population',
    'edit',
    'delete',
  ];

  // ✅ Filtering Signals
  searchTerm = signal<string>('');
  selectedCountry = signal<string>('');
  selectedContinent = signal<string>('');
  populationRange = signal<[number, number]>([0, 50000000]);

  /**
   * Fetches the list of cities from the API.
   */
  fetchCities(): void {
    const params = {
      page: this.page().toString(),
      limit: this.limit().toString(),
    };

    this.http
      .get<{ data: City[]; total: number }>(this.apiUrl, { params })
      .subscribe({
        next: (response) => {
          this.cities.set(response.data);
          this.totalCities.set(response.total);
          this.continentList.set([
            ...new Set([...response.data.map((city) => city.continent)]),
          ]);
          this.countryList.set([
            ...new Set([...response.data.map((city) => city.country)]),
          ]);
        },
        error: (error) => console.error('❌ Error fetching cities:', error),
      });
  }

  /**
   * Fetches city statistics (e.g., cities per continent, population stats).
   */
  fetchCityStats(): void {
    this.http.get<any>(`${this.apiUrl}/stats`).subscribe({
      next: (stats) => {
        console.log('✅ Stats fetched:', stats);

        if (
          !stats ||
          !stats.citiesPerContinent ||
          !stats.avgPopulationPerContinent
        ) {
          console.error('❌ Invalid stats structure:', stats);
          return;
        }

        this.cityStats.set(stats);
      },
      error: (error) => console.error('❌ Error fetching city stats:', error),
    });
  }

  /**
   * Adds a new city to the database via API.
   * @param city - City data to be added
   */

  addCity(city: any) {
    return this.http.post(`${this.apiUrl}`, city); // ✅ Return Observable
  }

  /**
   * Updates an existing city.
   * @param id - City ID
   * @param updatedCity - Updated city data
   */

  updateCity(id: number, city: any) {
    return this.http.put(`${this.apiUrl}/${id}`, city);
  }

  deleteCity(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * ✅ Computed property for filtering cities dynamically.
   */
  filteredCities = computed(() => {
    const result = this.cities()
      .filter(
        (city) =>
          city.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
          city.country.toLowerCase().includes(this.searchTerm().toLowerCase())
      )
      .filter(
        (city) =>
          !this.selectedCountry() || city.country === this.selectedCountry()
      )
      .filter(
        (city) =>
          !this.selectedContinent() ||
          city.continent === this.selectedContinent()
      )
      .filter(
        (city) =>
          city.population >= this.populationRange()[0] &&
          city.population <= this.populationRange()[1]
      );

    console.log('🔍 Filtered Cities:', result);
    return result;
  });

  chartData = computed(() => {
    const stats = this.cityStats();
    console.log(
      '📊 Processing Cities Per Continent:',
      stats?.citiesPerContinent
    );

    if (!stats || !Array.isArray(stats.citiesPerContinent)) return [];

    return stats.citiesPerContinent.map(
      ({ continent, count }: { continent: string; count: number }) => ({
        name: continent,
        value: Number(count) > 0 ? Number(count) : 0, // ✅ Ensure a valid number
      })
    );
  });

  populationChartData = computed(() => {
    const stats = this.cityStats();
    console.log(
      '📉 Processing Population Per Continent:',
      stats?.avgPopulationPerContinent
    );

    if (!stats || !Array.isArray(stats.avgPopulationPerContinent)) return [];

    return stats.avgPopulationPerContinent.map(
      ({
        continent,
        avgPopulation,
      }: {
        continent: string;
        avgPopulation: number;
      }) => ({
        name: continent as string,
        value: Number(avgPopulation) > 0 ? Number(avgPopulation) : 0, // ✅ Ensure a valid number
      })
    );
  });
}
