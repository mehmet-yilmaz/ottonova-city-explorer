import { Injectable, inject, signal, computed, effect } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { CityService } from './city.service';

@Injectable({ providedIn: 'root' })
export class MapService {
  private cityService = inject(CityService);
  private map!: L.Map;
  private markerCluster!: L.MarkerClusterGroup;

  // ✅ Signal to store Leaflet markers
  private cityMarkers = signal<L.Marker[]>([]);

  // ✅ Compute markers reactively when filtered cities change
  private generateMarkers = computed(() => {
    const cities = this.cityService.filteredCities();
    console.log('🏙️ Cities for Markers (After API Fetch):', cities);

    if (!cities.length) {
      console.warn('⚠️ No cities available to generate markers!');
      return [];
    }

    const markers = cities
      .map((city) => {
        if (!city.latitude || !city.longitude) {
          console.warn(`⚠️ Skipping ${city.name} (Missing coordinates)`);
          return null;
        }

        return L.marker([city.latitude, city.longitude], {
          icon: L.icon({
            iconUrl: 'assets/ottonova-marker.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
        }).bindPopup(`<b>${city.name}</b><br>${city.country}`);
      })
      .filter((marker) => marker !== null) as L.Marker[];

    console.log('✅ Generated Markers (After Fetch):', markers);
    return markers;
  });

  constructor() {
    effect(() => {
      const cities = this.cityService.filteredCities(); // ✅ Access signal inside effect
      console.log('🔄 Effect triggered: Cities updated in MapService:', cities);

      if (this.map && this.markerCluster) {
        this.updateMarkers();
      }
    });
  }

  /**
   * Initializes the map.
   */
  initializeMap(mapContainer: string): void {
    this.map = L.map(mapContainer).setView([20, 0], 2);

    // ✅ Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // ✅ Initialize Marker Cluster Group
    this.markerCluster = L.markerClusterGroup();
    this.map.addLayer(this.markerCluster);

    // ✅ Ensure markers are updated once the map is ready
    this.updateMarkers();
  }

  /**
   * Updates markers based on the latest filtered cities.
   */
  private updateMarkers(): void {
    if (!this.markerCluster || !this.map) return;

    console.log('🛠 Updating Markers with New Data:', this.cityMarkers());

    this.markerCluster.clearLayers(); // ✅ Remove old markers
    this.cityMarkers.set(this.generateMarkers()); // ✅ Update markers state

    if (this.cityMarkers().length > 0) {
      this.markerCluster.addLayers(this.cityMarkers());
      this.map.invalidateSize(); // ✅ Force map re-render
      this.map.fitBounds(this.markerCluster.getBounds(), { padding: [50, 50] });
    } else {
      console.warn('⚠️ No markers to display!');
    }
  }
}
