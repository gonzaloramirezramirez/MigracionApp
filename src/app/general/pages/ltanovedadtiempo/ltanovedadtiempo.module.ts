import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LtanovedadtiempoPageRoutingModule } from './ltanovedadtiempo-routing.module';

import { LtanovedadtiempoPage } from './ltanovedadtiempo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LtanovedadtiempoPageRoutingModule
  ],
  declarations: [LtanovedadtiempoPage]
})
export class LtanovedadtiempoPageModule {}
