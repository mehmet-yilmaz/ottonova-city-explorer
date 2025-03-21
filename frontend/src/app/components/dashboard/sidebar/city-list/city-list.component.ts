import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CityService } from '../../../../services/city.service';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MapService } from '../../../../services/map.service';
import { City } from '../../../../models/city.model';
import { CityFormComponent } from '../../city-form/city-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss',
})
export class CityListComponent implements OnInit {
  cityService = inject(CityService);
  mapService = inject(MapService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  cities = this.cityService.filteredCities;
  sort = signal<Sort | null>(null);

  sortedCities = computed(() => {
    const cities = this.cities();
    const currentSort = this.sort();

    if (!currentSort || !currentSort.active || currentSort.direction === '') {
      return cities; // No sorting applied, return as-is
    }

    return [...cities].sort((a, b) => {
      const isAsc = currentSort.direction === 'asc';
      switch (currentSort.active) {
        case 'name':
          return isAsc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'country':
          return isAsc
            ? a.country.localeCompare(b.country)
            : b.country.localeCompare(a.country);
        case 'continent':
          return isAsc
            ? a.continent.localeCompare(b.continent)
            : b.continent.localeCompare(a.continent);
        case 'population':
          return isAsc
            ? a.population - b.population
            : b.population - a.population;
        default:
          return 0;
      }
    });
  });

  onSortUpdated(event: Sort): void {
    this.sort.set(event);
  }

  constructor() {}
  ngOnInit(): void {
    this.cityService.fetchCities();
  }

  changePage(event: PageEvent): void {
    this.cityService.page.set(event.pageIndex + 1);
    this.cityService.fetchCities();
  }

  editCity(city: City): void {
    const dialogRef = this.dialog.open(CityFormComponent, {
      width: '40vw',
      height: '90%',
      data: city, // Pass the city data for editing
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('City updated, refreshing list.');
        this.cityService.fetchCities(); //  Refresh city list after update
      }
    });
  }

  confirmDelete(city: City): void {
    const confirmation = window.confirm(
      `Are you sure you want to delete ${city.id}?`
    );
    if (confirmation) {
      this.deleteCity(city.id);
    }
  }

  deleteCity(id: number): void {
    console.log('Deleting id: ', id);
    this.cityService.deleteCity(id).subscribe({
      next: () => {
        this.snackBar.open('City deleted successfully!', 'Close', {
          duration: 3000,
        });
        this.cityService.fetchCities(); // ✅ Refresh city list after deletion
      },
      error: () => {
        this.snackBar.open('Failed to delete city!', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
