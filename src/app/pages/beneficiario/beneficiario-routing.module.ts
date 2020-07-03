import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiarioPage } from './beneficiario.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiarioPageRoutingModule {}
