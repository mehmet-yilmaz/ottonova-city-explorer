import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartsComponent } from './charts/charts.component';
import { MapComponent } from './map/map.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, ChartsComponent, MapComponent, MatSidenavModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private cityService = inject(CityService);
  ngOnInit(): void {
    console.log('📊 Fetching city statistics...');
    this.cityService.fetchCityStats();
  }
}
