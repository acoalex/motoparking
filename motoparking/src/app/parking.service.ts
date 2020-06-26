import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { Parking } from './model/parking';
import { Subject } from 'rxjs';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  parkings: Parking[];

  constructor(private utils: UtilsService, private http: HttpClient, private events: EventsService) {
  }

  getParkingData() {
    this.http.get('assets/data/parkings.json')
      .subscribe(
        (data: any) => {
          this.parkings = Parking.fromJson(data);
          this.events.publish('parkings:loaded', {
            data: this.parkings,
            time: new Date()
          });
        },
        err => console.log(err)
      );
  }

  getParkings() {
    return this.parkings;
  }
}
