import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenunovedadessupervisorPage } from './menunovedadessupervisor.page';

const routes: Routes = [
  {
    path: '',
    component: MenunovedadessupervisorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenunovedadessupervisorPageRoutingModule {}
