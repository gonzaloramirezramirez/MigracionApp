import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UltimaubicacionPageRoutingModule } from './ultimaubicacion-routing.module';

import { UltimaubicacionPage } from './ultimaubicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UltimaubicacionPageRoutingModule
  ],
  declarations: [UltimaubicacionPage]
})
export class UltimaubicacionPageModule {}
