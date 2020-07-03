import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CilindroPageRoutingModule } from './cilindro-routing.module';

import { CilindroPage } from './cilindro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CilindroPageRoutingModule
  ],
  declarations: [CilindroPage]
})
export class CilindroPageModule {}
