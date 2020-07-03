import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import { CilindroI } from '../../models/cilindro.interface';
import { CilindroService } from '../../servicios/cilindro.service';

@Component({
  selector: 'app-modificar-cilindro',
  templateUrl: './modificar-cilindro.page.html',
  styleUrls: ['./modificar-cilindro.page.scss'],
})
export class ModificarCilindroPage implements OnInit, AfterViewInit {
  fechaCilindro: Date = new Date();
  ventacilindro: CilindroI = {
    cedulaCilindro: '',
    nombreCilindro: '',
    apellidoCilindro: '',
    fechaCilindro: new Date(),
    tamanoCilindro: '',
    cantidadCilindro: '',
  };
  constructor(private activatedRoute: ActivatedRoute,
              private fbService: CilindroService,
              private router: Router,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  doSomething(Date) {
    console.log('Date', moment(Date).format('DD-MM-YYYY')); // 2019-04-22
 }
  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.fbService.getVentaCilindro(id).subscribe(ventaCilindroData => {
        this.ventacilindro = ventaCilindroData;
      });
    }
  }
 async updateVentaCilindro() {
  const loading = await this.loadingCtrl.create({
    mode: 'ios',
    message: 'Realizando Registro...',
    spinner: 'lines-small'
  });
  await loading.present();
  this.fbService.updateVentaCilindro(this.ventacilindro).then(() => {
       // tslint:disable-next-line: quotemark
     this.showToast("Registro Actualizado");
     this.router.navigate(['/reporte']);
    }, err => {
    });
  loading.dismiss();
  return true;
  }
 async deleteVentaCilindro() {
  const loading = await this.loadingCtrl.create({
    mode: 'ios',
    message: 'Realizando Registro...',
    spinner: 'lines-small'
  });
  await loading.present();
  this.fbService.deleteVentaCilindro(this.ventacilindro.id).then(() => {
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
