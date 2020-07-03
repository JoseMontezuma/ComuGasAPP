import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import { NavController, ToastController, Platform, AlertController, LoadingController } from '@ionic/angular';

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

export interface GasI {
  id?: any;
  cedulaGas: string;
  nombreGas: string;
  apellidoGas: string;
  fechaGas: any;
  tamanoGas: string;
  cantidadGas: string;
}

export interface CilindroI {
  id?: any;
  cedulaCilindro: string;
  nombreCilindro: string;
  apellidoCilindro: string;
  fechaCilindro: any;
  tamanoCilindro: string;
  cantidadCilindro: string;
}


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  private BeneficiariosCollection: AngularFirestoreCollection<beneficiariosI>;
  private beneficiarios: Observable<beneficiariosI[]>;
  private data = [];
  private GasCollection: AngularFirestoreCollection<GasI>;
  private ventasGas: Observable<GasI[]>;
  private ventasCilindro: Observable<CilindroI[]>;
  private cilindroCollection: AngularFirestoreCollection<CilindroI>;
  private dataGas = [];
  private dataCilindro = [];
  consulta: '';



  constructor(public db: AngularFirestore,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public platform: Platform,
              public alertController: AlertController,
              public loadingCtrl: LoadingController, private router: Router) { }



             async loadResults() {
              const cedulaBen = this.consulta;
              const loading = await this.loadingCtrl.create({
                mode: 'ios',
                message: 'Realizando Consulta...',
                spinner: 'lines-small'
              });
              await loading.present();
              this.BeneficiariosCollection = this.db.collection('beneficiarios', ref =>
              ref.where('cedulaBen', '==', cedulaBen));
              this.beneficiarios = this.BeneficiariosCollection.valueChanges();
              this.data = [];
              const userDoc = this.BeneficiariosCollection;
              userDoc.get().subscribe((querySnapshot) => {
                querySnapshot.forEach((doc => {
                  this.data.push(doc.data());
                }));
                if (this.data.length === 0) {
                  this.presentAlert();
                  return false;
                 }


              });
              loading.dismiss();
              return true;
            }

            async loadResultsGas() {
              const cedulaGas = this.consulta;
              const loading = await this.loadingCtrl.create({
                mode: 'ios',
                message: 'Realizando Consulta...',
                spinner: 'lines-small'
              });
              await loading.present();
              this.GasCollection = this.db.collection('ventasGas', ref =>
              ref.where('cedulaGas', '==', cedulaGas).orderBy('fechaGas', 'desc').limit(1));
              this.ventasGas = this.GasCollection.valueChanges();
              this.dataGas = [];
              const userDoc = this.GasCollection;
              userDoc.get().subscribe((querySnapshot) => {
                querySnapshot.forEach((doc => {
                  this.dataGas.push(doc.data());
                }));
                if (this.dataGas.length === 0) {
                  this.presentAlertGas();
                  return false;
                 }
              });
              loading.dismiss();
              return true;
            }

            async loadResultsCilindro() {
              const cedulaCilindro = this.consulta;
              const loading = await this.loadingCtrl.create({
                mode: 'ios',
                message: 'Realizando Consulta...',
                spinner: 'lines-small'
              });
              await loading.present();
              this.cilindroCollection = this.db.collection('ventasCilindro', ref =>
              ref.where('cedulaCilindro', '==', cedulaCilindro).orderBy('fechaCilindro', 'desc').limit(1));
              this.ventasCilindro = this.cilindroCollection.valueChanges();
              this.dataCilindro = [];
              const userDoc = this.cilindroCollection;
              userDoc.get().subscribe((querySnapshot) => {
                querySnapshot.forEach((doc => {
                  this.dataCilindro.push(doc.data());
                }));
                if (this.dataCilindro.length === 0) {
                  this.presentAlertCilindro();
                  return false;
                 }
              });
              loading.dismiss();
              return true;
            }






            getBeneficiarios() {}
            getVentasGas() {}
            getVentasCilindro() {}
            clear(event) {
              window.location.reload();
              event.target.complete();
            }

  ngOnInit() {}



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'El titular de la Cedula:',
      message: 'No se encuentra registrado como Beneficiario. ',
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertGas() {
    const alert = await this.alertController.create({
      header: 'El titular de la Cedula:',
      message: 'No realizo ninguna compra de Gas. ',
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }

    async presentAlertCilindro() {
      const alert = await this.alertController.create({
        header: 'El titular de la Cedula:',
        message: 'No realizo ninguna compra de Cilindro.',
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    }
  }





