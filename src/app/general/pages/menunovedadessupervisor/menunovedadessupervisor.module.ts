import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenunovedadessupervisorPageRoutingModule } from './menunovedadessupervisor-routing.module';

import { MenunovedadessupervisorPage } from './menunovedadessupervisor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenunovedadessupervisorPageRoutingModule
  ],
  declarations: [MenunovedadessupervisorPage]
})
export class MenunovedadessupervisorPageModule {}
