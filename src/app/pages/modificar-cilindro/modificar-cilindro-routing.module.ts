import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarCilindroPage } from './modificar-cilindro.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarCilindroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarCilindroPageRoutingModule {}
