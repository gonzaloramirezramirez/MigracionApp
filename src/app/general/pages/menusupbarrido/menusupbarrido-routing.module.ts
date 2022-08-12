import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenusupbarridoPage } from './menusupbarrido.page';

const routes: Routes = [
  {
    path: '',
    component: MenusupbarridoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenusupbarridoPageRoutingModule {}
