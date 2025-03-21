import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { CityService } from '../../../../services/city.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  cityService = inject(CityService);

  updatePopulationRange(event: Event, index: number): void {
    const range = [...this.cityService.populationRange()];
    range[index] = Number((event.target as HTMLInputElement).value);
    this.cityService.populationRange.set(range as [number, number]);
  }

  resetFilters(): void {
    this.cityService.searchTerm.set('');
    this.cityService.selectedCountry.set('');
    this.cityService.selectedContinent.set('');
    this.cityService.populationRange.set([0, 50000000]);

    // ✅ Force UI refresh by triggering change detection
    setTimeout(() => {
      this.cityService.searchTerm.set(this.cityService.searchTerm());
      this.cityService.selectedCountry.set(this.cityService.selectedCountry());
      this.cityService.selectedContinent.set(
        this.cityService.selectedContinent()
      );
      this.cityService.populationRange.set(this.cityService.populationRange());
    });
  }

  formatLabel(value: number): string {
    if (value >= 1000000) return Math.round(value / 1000000) + 'M';
    if (value >= 1000) {
      return Math.round(value / 1000) + 'K';
    }

    return `${value}`;
  }
}
