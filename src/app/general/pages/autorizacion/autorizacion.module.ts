import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutorizacionPageRoutingModule } from './autorizacion-routing.module';

import { AutorizacionPage } from './autorizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutorizacionPageRoutingModule
  ],
  declarations: [AutorizacionPage]
})
export class AutorizacionPageModule {}
