import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfGasPageRoutingModule } from './pdf-gas-routing.module';

import { PdfGasPage } from './pdf-gas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfGasPageRoutingModule
  ],
  declarations: [PdfGasPage]
})
export class PdfGasPageModule {}
