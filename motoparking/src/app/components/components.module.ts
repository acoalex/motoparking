import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  exports: [MapComponent, DetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
