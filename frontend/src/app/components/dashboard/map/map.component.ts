import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { City } from '../../../models/city.model';
import { MapService } from '../../../services/map.service';
import { CityService } from '../../../services/city.service';
import { AddCityComponent } from './add-city/add-city.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [AddCityComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private mapService = inject(MapService);

  ngAfterViewInit(): void {
    this.mapService.initializeMap(this.mapContainer.nativeElement);
  }
}
