import { Component, effect, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  BarChartModule,
  PieChartModule,
  LegendPosition,
} from '@swimlane/ngx-charts';
import { CityService } from '../../../services/city.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [MatCardModule, BarChartModule, PieChartModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {
  cityService = inject(CityService);

  cityChartData = this.cityService.chartData;
  populationChartData = this.cityService.populationChartData;

  constructor() {
    effect(() => {
      console.log(
        '📊 Chart Updated: Cities Per Continent',
        this.cityChartData()
      );
      console.log(
        '📉 Chart Updated: Population Per Continent',
        this.populationChartData()
      );
    });
  }
}
