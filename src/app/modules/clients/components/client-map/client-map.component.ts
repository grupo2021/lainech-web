import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { Map, Marker } from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-map',
  templateUrl: './client-map.component.html',
  styleUrls: ['./client-map.component.scss'],
})
export class ClientMapComponent implements OnInit {
  public map!: Map;

  constructor() {}

  ngOnInit(): void {
    this.createdMap();
  }

  createdMap() {
    (mapboxgl.accessToken as any) = environment.token;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-66.15689613829687, -17.393748196299114],
      zoom: 15,
    });

    this.createdMarker(-66.15689613829687, -17.393748196299114);
    // if (this.lockLocation) {
    //   this.createMarkerFixed(this.lockLocation);
    // } else {
    //   this.createdMarker(-66.16090109719788, -17.442175031276946);
    // }
  }

  createdMarker(lng: number, lat: number) {
    const marker = new Marker({ draggable: true })
      .setLngLat([lng, lat])
      .addTo(this.map);
    marker.on('dragend', () => {
      console.log(marker.getLngLat());
    });
  }

  // createMarkerFixed(location: string) {
  //   const arr = location.split(',');
  //   const lng = Number(arr[0]);
  //   const lat = Number(arr[1]);
  //   new Mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
  // }

  getLng(location: string) {
    if (location) {
      const arr = location.split(',');
      return Number(arr[0]);
    }
    return -66.16090109719788;
  }

  getLat(location: string) {
    if (location) {
      const arr = location.split(',');
      return Number(arr[1]);
    }
    return -17.442175031276946;
  }
}
