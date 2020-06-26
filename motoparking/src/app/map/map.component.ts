import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import { EventsService } from '../events.service';
import { Parking } from '../model/parking';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: Map;

  constructor(private events: EventsService) {
    console.log("Map init");
    this.events.subscribe('parkings:loaded', (data: any) => {
      this.loadParkings(data.data);
    });
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.map = new Map("mapId").setView([42.85384923070, -2.67825300662], 13);
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
    let newMarker = marker([element.getLat(), element.getLongitude()], {
      draggable: true,
      title: element.CALLE
    }).addTo(this.map);

    newMarker.on("click", () => {
      this.events.publish('parking:clicked', {
        data: element,
        time: new Date()
      });
    });
  }

  getOptions() {

  }
}
