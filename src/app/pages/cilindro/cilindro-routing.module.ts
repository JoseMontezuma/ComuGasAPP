import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CilindroPage } from './cilindro.page';

const routes: Routes = [
  {
    path: '',
    component: CilindroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CilindroPageRoutingModule {}
