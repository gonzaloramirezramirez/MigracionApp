import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecorridorutaPage } from './recorridoruta.page';

const routes: Routes = [
  {
    path: '',
    component: RecorridorutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecorridorutaPageRoutingModule {}
