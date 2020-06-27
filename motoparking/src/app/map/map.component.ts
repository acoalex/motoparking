import { Component, OnInit, OnDestroy } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import { EventsService } from '../events.service';
import { Parking } from '../model/parking';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  map: Map;
  city: string;

  constructor(private events: EventsService, private utils: UtilsService) {
    console.log("Map init");
    this.events.subscribe('parkings:loaded', (data: any) => {
      if (this.map) {
        this.map.remove();
      }
      this.loadMap(data.center);
      this.city = data.city;
      this.loadParkings(data.data);
    });
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

  ngOnInit() {
  }

  loadMap(center: any) {
    this.map = new Map("mapId").setView(center, 13);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(this.map);
  }

  loadParkings(data: Parking[]) {
    data.forEach(element => {
      this.addMarker(element);
    })
  }

  addMarker(element: Parking) {
    let lat = (this.city == 'vitoria') ? element.getLat() : this.utils.utmToLatLng(30, element.getLat(), element.getLongitude(), true).latitude;
    let long = (this.city == 'vitoria') ? element.getLongitude() : this.utils.utmToLatLng(30, element.getLat(), element.getLongitude(), true).longitude;

    let newMarker = marker([lat, long], {
      draggable: false,
      title: element.CALLE
    }).addTo(this.map);

    newMarker.on("click", () => {
      this.events.publish('parking:clicked', {
        data: element,
        time: new Date()
      });
    });
  }
}
