import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutorizacionPage } from './autorizacion.page';

const routes: Routes = [
  {
    path: '',
    component: AutorizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutorizacionPageRoutingModule {}
