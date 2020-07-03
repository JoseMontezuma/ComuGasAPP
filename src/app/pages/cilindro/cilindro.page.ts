import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router} from '@angular/router';
import * as moment from 'moment';
import { CilindroI } from '../../models/cilindro.interface';
import { CilindroService } from '../../servicios/cilindro.service';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-cilindro',
  templateUrl: './cilindro.page.html',
  styleUrls: ['./cilindro.page.scss'],
})
export class CilindroPage implements OnInit {
  fechaCilindro: Date = new Date();
  ventacilindro: CilindroI = {
    cedulaCilindro: '',
    nombreCilindro: '',
    apellidoCilindro: '',
    fechaCilindro: new Date(),
    tamanoCilindro: '',
    cantidadCilindro: '',
  };
  encodeData: string ;
  encodedData: {} ;
  constructor(private toastCtrl: ToastController,
              private router: Router,
              private fbService: CilindroService,
              private loadingCtrl: LoadingController,
              private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }
  doSomething(Date) {
    console.log('Date', moment(Date).format('DD-MM-YYYY')); // 2019-04-22
 }
 async addVentaCilindro() {
  if (!this.formValidation()) {
    const loading = await this.loadingCtrl.create({
      mode: 'ios',
      message: 'Realizando Registro...',
      spinner: 'lines-small'
    });
    await loading.present();
    this.fbService.addVentaCilindro(this.ventacilindro).then(() => {
    // tslint:disable-next-line: quotemark
    this.showToast("Registro Exitoso");
    this.router.navigateByUrl('/reporte');
    return true;
  }, err => {
  });
    loading.dismiss();
    return true;
}
}
  formValidation() {
    if (!this.ventacilindro.cedulaCilindro) {
      // tslint:disable-next-line: quotemark
      this.showToast("Ingresa el Numero de Cedula");
      return true;
    }
    if (!this.ventacilindro.nombreCilindro) {
      // tslint:disable-next-line: quotemark
      this.showToast("Ingresa el Nombre");
      return true;
    }
    if (!this.ventacilindro.apellidoCilindro) {
      // tslint:disable-next-line: quotemark
      this.showToast("Ingresa el Apellido");
      return true;
    }

    if (!this.ventacilindro.fechaCilindro) {
      // tslint:disable-next-line: quotemark
      this.showToast("Ingresa la Fecha de Compra");
      return true;
    }
    if (!this.ventacilindro.cantidadCilindro) {
      // tslint:disable-next-line: quotemark
      this.showToast("Ingresa la Cantidad de Cilindros");
      return true;
    }
    if (!this.ventacilindro.tamanoCilindro) {
      // tslint:disable-next-line: quotemark
      this.showToast("Ingresa el tamaño de los Cilindros");
      return true;
    }
  }
  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 1000
     }).then(toastData => toastData.present());
  }
  encodeText() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then((encodedData) => {
        console.log(encodedData);
        this.encodedData = encodedData;
    }, (err) => {
        console.log('Error occured : ' + err);
    });
}
 }

