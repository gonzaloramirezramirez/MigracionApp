import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspeccionrecoleccionPage } from './inspeccionrecoleccion.page';

const routes: Routes = [
  {
    path: '',
    component: InspeccionrecoleccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspeccionrecoleccionPageRoutingModule {}
