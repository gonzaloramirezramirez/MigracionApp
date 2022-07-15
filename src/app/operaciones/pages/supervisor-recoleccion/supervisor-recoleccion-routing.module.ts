import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorRecoleccionPage } from './supervisor-recoleccion.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorRecoleccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorRecoleccionPageRoutingModule {}
