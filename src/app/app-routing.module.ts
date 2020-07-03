import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule), canActivate: [NologinGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./componentes/registro/registro.module').then( m => m.RegistroPageModule), canActivate: [NologinGuard]
  },
  {
    path: 'consulta',
    loadChildren: () => import('./pages/consulta/consulta.module').then( m => m.ConsultaPageModule)
  },
  {
    path: 'comunidad',
    loadChildren: () => import('./pages/comunidad/comunidad.module').then( m => m.ComunidadPageModule)
  },
  {
    path: 'venta',
    loadChildren: () => import('./pages/venta/venta.module').then( m => m.VentaPageModule)
  },
  {
    path: 'reporte',
    loadChildren: () => import('./pages/reporte/reporte.module').then( m => m.ReportePageModule)
  },
  {
    path: 'beneficiario',
    loadChildren: () => import('./pages/beneficiario/beneficiario.module').then( m => m.BeneficiarioPageModule)
  },
  {
    path: 'ben/:id',
    loadChildren: () => import('./pages/modificar-ben/modificar-ben.module').then( m => m.ModificarBenPageModule)
  },
  {
    path: 'ben',
    loadChildren: ()  => import ('./pages/modificar-ben/modificar-ben.module').then( m => m.ModificarBenPageModule)
  },
  {
    path: 'cilindro',
    loadChildren: () => import('./pages/cilindro/cilindro.module').then( m => m.CilindroPageModule)
  },
  {
    path: 'gas/:id',
    loadChildren: () => import('./pages/modificar-gas/modificar-gas.module').then( m => m.ModificarGasPageModule)
  },
  {
    path: 'cilindro/:id',
    loadChildren: () => import('./pages/modificar-cilindro/modificar-cilindro.module').then( m => m.ModificarCilindroPageModule)
  },
  {
    path: 'pdf-gas',
    loadChildren: () => import('./pages/pdf-gas/pdf-gas.module').then( m => m.PdfGasPageModule)
  },
  {
    path: 'pdf',
    loadChildren: () => import('./pages/pdf-cilindro/pdf.module').then( m => m.PdfPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
