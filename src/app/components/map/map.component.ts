import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa') mapa;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoibHVpc3NvdG8iLCJhIjoiY2tiNDZnOGExMHNkbDJ0bXRnaW5zbmV1YSJ9.uyUhDWFOUGGbfAJUNJFU9Q';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: 15
    });

    new mapboxgl.Marker()
      .setLngLat( [ lng, lat ] )
      .addTo( map );
  }

}
