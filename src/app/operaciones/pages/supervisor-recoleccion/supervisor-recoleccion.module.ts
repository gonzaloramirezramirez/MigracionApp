import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisorRecoleccionPageRoutingModule } from './supervisor-recoleccion-routing.module';

import { SupervisorRecoleccionPage } from './supervisor-recoleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisorRecoleccionPageRoutingModule
  ],
  declarations: [SupervisorRecoleccionPage]
})
export class SupervisorRecoleccionPageModule {}
