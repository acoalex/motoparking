import { Component } from '@angular/core';
import { ParkingService } from '../parking.service';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  city: string = "Motoparking Gasteiz";
  constructor(private parkingService: ParkingService, private actionSheetController: ActionSheetController, private storage: StorageService, private events: EventsService) {
    this.events.subscribe('parkings:loaded', (data: any) => {
      if (data.city == 'vitoria') {
        this.city = "Vitoria-Gasteiz";
      }
      else {
        this.city = "Donosti";
      }
    });
  }

  ngAfterViewInit() {
    this.storage.load('ciudad').then(data => {
      (data) ? this.parkingService.getParkingData(data) : this.parkingService.getParkingData();
    });
  }

  async clickMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ciudades',
      cssClass: 'city-class',
      buttons: [{
        text: 'Vitoria-Gasteiz',
        icon: 'compass-outline',
        handler: () => {
          this.changeCiudad('vitoria');
        }
      }, {
        text: 'Donosti',
        icon: 'compass-outline',
        handler: () => {
          this.changeCiudad('donosti');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  changeCiudad(city: string) {
    this.parkingService.changeCiudad(city);
  }
}
