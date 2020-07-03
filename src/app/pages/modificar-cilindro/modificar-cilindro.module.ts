import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarCilindroPageRoutingModule } from './modificar-cilindro-routing.module';

import { ModificarCilindroPage } from './modificar-cilindro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarCilindroPageRoutingModule
  ],
  declarations: [ModificarCilindroPage]
})
export class ModificarCilindroPageModule {}
