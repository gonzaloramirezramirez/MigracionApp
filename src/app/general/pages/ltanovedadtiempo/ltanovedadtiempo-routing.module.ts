import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LtanovedadtiempoPage } from './ltanovedadtiempo.page';

const routes: Routes = [
  {
    path: '',
    component: LtanovedadtiempoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LtanovedadtiempoPageRoutingModule {}
