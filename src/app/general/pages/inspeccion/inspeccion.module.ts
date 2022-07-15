import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspeccionPageRoutingModule } from './inspeccion-routing.module';

import { InspeccionPage } from './inspeccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspeccionPageRoutingModule
  ],
  declarations: [InspeccionPage]
})
export class InspeccionPageModule {}
