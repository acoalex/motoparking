import { Component } from '@angular/core';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private parkingService: ParkingService) {
    this.parkingService.getParkingData();
  }

}
