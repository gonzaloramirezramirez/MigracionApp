import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspeccionrecoleccionPageRoutingModule } from './inspeccionrecoleccion-routing.module';

import { InspeccionrecoleccionPage } from './inspeccionrecoleccion.page';
import { DBService } from '../../services/db.service';
import { GeneralServiceService } from '../../services/general-service.service';
import { DxAccordionModule, DxListModule, DxRadioGroupModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspeccionrecoleccionPageRoutingModule,
    DxAccordionModule,
    DxRadioGroupModule,
    DxListModule
  ],
  declarations: [InspeccionrecoleccionPage],
  providers: [DBService, GeneralServiceService]
})
export class InspeccionrecoleccionPageModule {}
