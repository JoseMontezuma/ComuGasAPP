import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfGasPage } from './pdf-gas.page';

const routes: Routes = [
  {
    path: '',
    component: PdfGasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfGasPageRoutingModule {}
