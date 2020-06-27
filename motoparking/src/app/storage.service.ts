import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  store(key: string, value: any) {
    this.storage.ready().then(val => {
      this.storage.set(key, value);
    });
  }

  load(key: string): any {
    return this.storage.get(key);
  }
}
