import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UltimaubicacionPage } from './ultimaubicacion.page';

const routes: Routes = [
  {
    path: '',
    component: UltimaubicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UltimaubicacionPageRoutingModule {}
