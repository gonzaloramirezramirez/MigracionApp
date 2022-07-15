import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspeccionrecoleccionPageRoutingModule } from './inspeccionrecoleccion-routing.module';

import { InspeccionrecoleccionPage } from './inspeccionrecoleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspeccionrecoleccionPageRoutingModule
  ],
  declarations: [InspeccionrecoleccionPage]
})
export class InspeccionrecoleccionPageModule {}
