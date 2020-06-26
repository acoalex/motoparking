import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Parking } from '../model/parking';

const long_moto = 1.5;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  calle: string;
  barrio: string;
  capacidad: number = 0;
  navigate: string;

  constructor(private events: EventsService) {
    this.events.subscribe('parking:clicked', (data: any) => {
      this.loadDetail(data.data);
    });
  }

  ngOnInit() { }

  loadDetail(data: Parking) {
    this.calle = data.CALLE + " Nº " + data.NUMERO;
    this.barrio = data.BARRIO;
    this.capacidad = this.getCapacidad(data.LONGITUD);
    this.navigate = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(this.calle + " Vitoria-Gasteiz");
  }

  getCapacidad(capacidad: number) {
    return Math.floor(this.toNumber(capacidad) / long_moto);
  }

  goTo() {
    window.open(this.navigate, "_blank");
  }

  counter(i: number) {
    return new Array(i);
  }

  toNumber(capacidad: number) {
    return Number(capacidad.toString().replace(",", "."));
  }
}
