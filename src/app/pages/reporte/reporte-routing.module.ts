import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportePage } from './reporte.page';

const routes: Routes = [
  {
    path: '',
    component: ReportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportePageRoutingModule {}
