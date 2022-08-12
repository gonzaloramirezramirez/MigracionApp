import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenusupbarridoPageRoutingModule } from './menusupbarrido-routing.module';

import { MenusupbarridoPage } from './menusupbarrido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenusupbarridoPageRoutingModule
  ],
  declarations: [MenusupbarridoPage]
})
export class MenusupbarridoPageModule {}
