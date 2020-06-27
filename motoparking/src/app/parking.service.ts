import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { Parking } from './model/parking';
import { EventsService } from './events.service';
import { StorageService } from './storage.service';

const vitoria_center = [42.85384923070, -2.67825300662];
const donosti_center = [43.3062919, -1.9760717];

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  parkings: Parking[];

  constructor(private http: HttpClient, private events: EventsService, private storage: StorageService) {
  }

  getParkingData(ciudad: string = 'vitoria') {
    const url = (ciudad == 'vitoria') ? 'assets/data/parkings.json' : 'assets/data/parkings_donosti.json'
    this.http.get(url)
      .subscribe(
        (data: any) => {
          this.parkings = (ciudad == 'vitoria') ? Parking.fromJson(data) : Parking.fromJsonDonosti(data);
          this.events.publish('parkings:loaded', {
            data: this.parkings,
            city: ciudad,
            center: (ciudad == 'vitoria') ? vitoria_center : donosti_center,
            time: new Date()
          });
        },
        err => console.log(err)
      );
  }

  getParkings() {
    return this.parkings;
  }

  changeCiudad(ciudad: string) {
    this.storage.store('city', ciudad);
    this.getParkingData(ciudad);
  }
}
