import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, LoadingController} from '@ionic/angular';
import {GasI} from '../../models/gas.interface';
import {GasService} from '../../servicios/gas.service';
import { Router} from '@angular/router';
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';


// tslint:disable-next-line: class-name
export interface beneficiariosI {
  id?: any;
  cedulaBen: string;
  nombreBen: string;
  apellidoBen: string;
  telefonoBen: string;
  calleBen: string;
  cpBen: string;
  cmBen: string;
  cgBen: string;
}
@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {
  private BeneficiariosCollection: AngularFirestoreCollection<beneficiariosI>;
  private beneficiarios: Observable<beneficiariosI[]>;
  private data = [];
  consulta: '';

  fechaGas: Date = new Date();
  ventagas: GasI = {
    cedulaGas: '',
    nombreGas: '',
    apellidoGas: '',
    fechaGas: new Date(),
    tamanoGas: '',
    cantidadGas: '',
  };
  encodeData: string ;
  encodedData: {} ;
  constructor(private toastCtrl: ToastController,
              private router: Router,
              private fbService: GasService,
              private loadingCtrl: LoadingController,
              public alertController: AlertController,
              public db: AngularFirestore,
              private barcodeScanner: BarcodeScanner
              ) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'El titular de la Cedula:',
      message: 'No se encuentra registrado como Beneficiario. ',
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }
  doSomething(Date) {
    console.log('Date', moment(Date).format('DD-MM-YYYY')); // 2019-04-22
 }

  async addVentaGas() {
    if (!this.formValidation()) {
      const loading = await this.loadingCtrl.create({
        mode: 'ios',
        message: 'Realizando Registro...',
        spinner: 'lines-small'
      });
      await loading.present();
      this.fbService.addVentaGas(this.ventagas).then(() => {
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
      if (!this.ventagas.cedulaGas) {
        // tslint:disable-next-line: quotemark
        this.showToast("Ingresa el Numero de Cedula");
        return true;
      }
      if (!this.ventagas.nombreGas) {
        // tslint:disable-next-line: quotemark
        this.showToast("Ingresa el Nombre");
        return true;
      }
      if (!this.ventagas.apellidoGas) {
        // tslint:disable-next-line: quotemark
        this.showToast("Ingresa el Apellido");
        return true;
      }

      if (!this.ventagas.fechaGas) {
        // tslint:disable-next-line: quotemark
        this.showToast("Ingresa la fecha de la compra");
        return true;
      }
      if (!this.ventagas.cantidadGas) {
        // tslint:disable-next-line: quotemark
        this.showToast("Ingresa la Cantidad de Cilindros a llenar");
        return true;
      }
      if (!this.ventagas.tamanoGas) {
        // tslint:disable-next-line: quotemark
        this.showToast("Ingresa el Tamaño de los Cilindros ");
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
