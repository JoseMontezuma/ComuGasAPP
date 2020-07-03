import { GasService } from './../../servicios/gas.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CilindroService } from '../../servicios/cilindro.service';
import { CilindroI } from '../../models/cilindro.interface';
import { GasI } from '../../models/gas.interface';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  ventasGas: Observable <GasI[]>;
  ventasCilindro: Observable <CilindroI[]>;
  segmentModel = 'Gas';

  constructor(private fbService: GasService, private vcService: CilindroService) {  }

  ngOnInit(): void {
    this.ventasGas = this.fbService.getVentasGas();
    this.ventasCilindro = this.vcService.getVentasCilindro();
  }
  segmentChanged( event ) {
    const valorSegmento = event.detail.value;
    console.log(valorSegmento);
  }
}
