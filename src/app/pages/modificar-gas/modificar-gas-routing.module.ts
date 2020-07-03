import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarGasPage } from './modificar-gas.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarGasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarGasPageRoutingModule {}
