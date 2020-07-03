import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GasService } from '../../servicios/gas.service';
import { GasI } from '../../models/gas.interface';
import { ToastController, LoadingController } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-modificar-gas',
  templateUrl: './modificar-gas.page.html',
  styleUrls: ['./modificar-gas.page.scss'],
})
export class ModificarGasPage implements OnInit, AfterViewInit  {
  fechaGas: Date = new Date();
  ventagas: GasI = {
    cedulaGas: '',
    nombreGas: '',
    apellidoGas: '',
    fechaGas: new Date(),
    tamanoGas: '',
    cantidadGas: '',
  };

  constructor(private activatedRoute: ActivatedRoute,
              private fbService: GasService,
              private router: Router,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  cambioFecha( date ) {
    console.log('date', moment(date).format('DD-MM-YYYY'));

  }
   ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.fbService.getVentaGas(id).subscribe(ventaGasData => {
        this.ventagas = ventaGasData;
      });
    }
  }
  async updateVentaGas() {
    const loading = await this.loadingCtrl.create({
      mode: 'ios',
      message: 'Realizando Registro...',
      spinner: 'lines-small'
    });
    await loading.present();
    this.fbService.updateVentaGas(this.ventagas).then(() => {
       // tslint:disable-next-line: quotemark
     this.showToast("Registro Actualizado");
     this.router.navigate(['/reporte']);
    }, err => {
    });
    loading.dismiss();
    return true;
  }
 async  deleteVentaGas() {
  const loading = await this.loadingCtrl.create({
    mode: 'ios',
    message: 'Realizando Registro...',
    spinner: 'lines-small'
  });
  await loading.present();
  this.fbService.deleteVentaGas(this.ventagas.id).then(() => {
      // tslint:disable-next-line: quotemark
      this.showToast("Registro Eliminado");
      this.router.navigateByUrl('/reporte');
    }, err => {
    });
  loading.dismiss();
  return true;
  }
  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 1000
     }).then(toastData => toastData.present());
  }
}
