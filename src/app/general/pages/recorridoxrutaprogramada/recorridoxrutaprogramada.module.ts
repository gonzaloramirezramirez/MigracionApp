import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecorridoxrutaprogramadaPageRoutingModule } from './recorridoxrutaprogramada-routing.module';

import { RecorridoxrutaprogramadaPage } from './recorridoxrutaprogramada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecorridoxrutaprogramadaPageRoutingModule
  ],
  declarations: [RecorridoxrutaprogramadaPage]
})
export class RecorridoxrutaprogramadaPageModule {}
