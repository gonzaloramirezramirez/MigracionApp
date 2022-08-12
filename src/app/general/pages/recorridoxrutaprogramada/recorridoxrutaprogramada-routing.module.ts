import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecorridoxrutaprogramadaPage } from './recorridoxrutaprogramada.page';

const routes: Routes = [
  {
    path: '',
    component: RecorridoxrutaprogramadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecorridoxrutaprogramadaPageRoutingModule {}
