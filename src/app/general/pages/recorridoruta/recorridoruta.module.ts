import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecorridorutaPageRoutingModule } from './recorridoruta-routing.module';

import { RecorridorutaPage } from './recorridoruta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecorridorutaPageRoutingModule
  ],
  declarations: [RecorridorutaPage]
})
export class RecorridorutaPageModule {}
