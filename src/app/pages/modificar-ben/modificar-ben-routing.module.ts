import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarBenPage } from './modificar-ben.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarBenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarBenPageRoutingModule {}
