import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespachosRecoleccionPageRoutingModule } from './despachos-recoleccion-routing.module';

import { DespachosRecoleccionPage } from './despachos-recoleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespachosRecoleccionPageRoutingModule
  ],
  declarations: [DespachosRecoleccionPage]
})
export class DespachosRecoleccionPageModule {}
