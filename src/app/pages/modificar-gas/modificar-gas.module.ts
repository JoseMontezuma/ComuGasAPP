import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarGasPageRoutingModule } from './modificar-gas-routing.module';

import { ModificarGasPage } from './modificar-gas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarGasPageRoutingModule
  ],
  declarations: [ModificarGasPage]
})
export class ModificarGasPageModule {}
