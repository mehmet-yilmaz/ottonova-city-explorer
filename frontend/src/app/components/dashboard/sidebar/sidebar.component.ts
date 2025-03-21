import { Component } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { CityListComponent } from './city-list/city-list.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FiltersComponent, CityListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
