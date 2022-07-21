import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { IonicStorageModule } from '@ionic/storage-angular';
import { DBService } from '../../services/db.service';
import { DxLookupModule } from 'devextreme-angular';
import { SincronizarService } from '../../services/sincronizar.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    DxLookupModule
  ],
  declarations: [LoginPage],
  providers: [DBService, SincronizarService]
})
export class LoginPageModule {}
