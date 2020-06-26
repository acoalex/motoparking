import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  csvRecords: any[] = [];
  header = false;
  constructor() {
    console.log("Utils service");
  }

}
