import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { DetailComponent } from '../detail/detail.component';



@NgModule({
  declarations: [
    MapComponent,
    DetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [MapComponent, DetailComponent]
})
export class ComponentsModule { }
