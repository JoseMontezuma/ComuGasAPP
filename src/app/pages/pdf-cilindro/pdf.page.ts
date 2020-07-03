import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { NavController, ToastController, Platform, AlertController, LoadingController } from '@ionic/angular';

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
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {
  private cilindroCollection: AngularFirestoreCollection<CilindroI>;
  private ventasCilindro: Observable<CilindroI[]>;
  private data = [];
  pdf: any;

  date = new Date();
  dia = this.date.getDate();
  mes = this.date.getMonth() + 1;
  año = this.date.getFullYear();
  fecha = `${this.dia}/${this.mes}/${this.año}`;

  constructor(public db: AngularFirestore,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public platform: Platform,
              public alertController: AlertController,
              public loadingCtrl: LoadingController,
              public file: File,
              public fileOpener: FileOpener) { }

              async loadResults() {
                this.cilindroCollection = this.db.collection('ventasCilindro', ref => ref.orderBy('fechaCilindro', 'desc'));
                this.ventasCilindro = this.cilindroCollection.valueChanges();
                this.data = [];
                const userDoc = this.cilindroCollection;
                userDoc.get().subscribe((querySnapshot) => {
                  querySnapshot.forEach((doc => {
                    console.log(doc.id, '=>', doc.data());
                    this.data.push(doc.data());
                  }));
                });
              }
              async loadResultsLimit() {
                this.cilindroCollection = this.db.collection('ventasCilindro', ref => ref.orderBy('fechaCilindro', 'desc').limit(10));
                this.ventasCilindro = this.cilindroCollection.valueChanges();
                this.data = [];
                const userDoc = this.cilindroCollection;
                userDoc.get().subscribe((querySnapshot) => {
                  querySnapshot.forEach((doc => {
                    console.log(doc.id, '=>', doc.data());
                    this.data.push(doc.data());
                  }));
                });
              }
              async loadResultsLimitPequenos() {
                const loading = await this.loadingCtrl.create({
                  mode: 'ios',
                  message: 'Cargando Datos...',
                  spinner: 'lines-small'
                });
                await loading.present();
                // tslint:disable-next-line: triple-equals
                // tslint:disable-next-line: max-line-length
                this.cilindroCollection = this.db.collection('ventasCilindro', ref => ref.where('tamanoCilindro', '==' , 'Pequeños').orderBy('fechaCilindro', 'desc').limit(10));
                this.ventasCilindro = this.cilindroCollection.valueChanges();
                this.data = [];
                const userDoc = this.cilindroCollection;
                userDoc.get().subscribe((querySnapshot) => {
                  querySnapshot.forEach((doc => {
                    console.log(doc.id, '=>', doc.data());
                    this.data.push(doc.data());
                  }));
                  if (this.data.length === 0) {
                    this.presentAlertNo();
                    return false;
                  }
                });
                loading.dismiss();
                return true;
              }
              async loadResultsLimitMedianos() {
                const loading = await this.loadingCtrl.create({
                  mode: 'ios',
                  message: 'Cargando Datos...',
                  spinner: 'lines-small'
                });
                await loading.present();
                // tslint:disable-next-line: triple-equals
                // tslint:disable-next-line: max-line-length
                this.cilindroCollection = this.db.collection('ventasCilindro', ref => ref.where('tamanoCilindro', '==' , 'Medianos').orderBy('fechaCilindro', 'desc').limit(10));
                this.ventasCilindro = this.cilindroCollection.valueChanges();
                this.data = [];
                const userDoc = this.cilindroCollection;
                userDoc.get().subscribe((querySnapshot) => {
                  querySnapshot.forEach((doc => {
                    console.log(doc.id, '=>', doc.data());
                    this.data.push(doc.data());
                  }));
                  if (this.data.length === 0) {
                    this.presentAlertNo();
                    return false;
                  }
                });
                loading.dismiss();
                return true;
              }

              async loadResultsLimitGrandes() {
                const loading = await this.loadingCtrl.create({
                  mode: 'ios',
                  message: 'Cargando Datos...',
                  spinner: 'lines-small'
                });
                await loading.present();
                // tslint:disable-next-line: triple-equals
                // tslint:disable-next-line: max-line-length
                this.cilindroCollection = this.db.collection('ventasCilindro', ref => ref.where('tamanoCilindro', '==' , 'Grandes').orderBy('fechaCilindro', 'desc').limit(10));
                this.ventasCilindro = this.cilindroCollection.valueChanges();
                this.data = [];
                const userDoc = this.cilindroCollection;
                userDoc.get().subscribe((querySnapshot) => {
                  querySnapshot.forEach((doc => {
                    console.log(doc.id, '=>', doc.data());
                    this.data.push(doc.data());
                  }));
                  if (this.data.length === 0) {
                    this.presentAlertNo();
                    return false;
                  }
                });
                loading.dismiss();
                return true;
              }
              getVentasCilindro() {
              }
  ngOnInit() {
  }

  generarPDF() {
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    const data = [
      ['Nombre', 'Apellido', 'Cédula',  'Cantidad', 'Tamaño']
    ];
    this.data.forEach(user => {
     // tslint:disable-next-line: max-line-length
     data.push([user.nombreCilindro, user.apellidoCilindro, user.cedulaCilindro, user.cantidadCilindro, user.tamanoCilindro]);
     console.log('position', user);
    });
    if (this.data.length === 0) {
    this.presentAlert();
    return false;
    }
    const docDefinition = {
      footer: (currentPage, pageCount) =>
      ({ text: currentPage.toString() + ' de ' + pageCount, alignment: 'center'}),

      header: {
        margin: 10,
        columns: [
            // tslint:disable-next-line: max-line-length
            {	image: 'data:image/png;base64,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',
            width: 120,
            fit: [150, 150],
            pageBreak: 'after'
            } ]
      },
      content: [
        {
        text: this.fecha,
        width: '*',
        alignment: 'right',
        style: 'small'
        },
        {
          width: '*',
          text: 'República Bolivariana de Venezuela',
          style: 'subheader',
          alignment: 'center'
        },
        {
          width: '*',
          text: 'San Sebastian de los Reyes-Estado Aragua',
          style: 'subheader',
          alignment: 'center'
        },
        {
          width: '*',
          text: 'Comunidad del Sector El Polvero',
          style: 'subheader',
          alignment: 'center'
        },
        {
          width: '*',
          text: 'ComuGasApp',
          style: 'subheader',
          alignment: 'center'
        },
        {
        text: 'REPORTE PDF',
        width: '*',
        alignment: 'center',
        style: 'subheader'
      },
      {
        width: '*',
        alignment: 'center',
        style: 'subheader',
        text: 'Registro de las Ventas de Cilindros Realizadas '
      },
      {
        columns: [
          { width: '*', text: ''},
          {
            width: 'auto',
            table: {
              body: data,
              widths: ['*', '*', '*', '*', '*']
            }
          },
          { width: '*', text: ''}
        ]
      }
      ],
      styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15],

      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      small: {
        fontSize: 8,
      }
    }
    };
    this.pdf = pdfmake.createPdf(docDefinition);
    this.openPDF();
  }

  async openPDF() {

    const loading = await this.loadingCtrl.create({
      mode: 'ios',
      message: 'Generando PDF...',
      spinner: 'lines-small'
    });
    await loading.present();

    if (this.platform.is('cordova')) {
      this.pdf.getBuffer((buffer) => {
        const blob = new Blob([ buffer ], { type: 'application/pdf' });
        this.file .writeFile(this.file.externalDataDirectory, 'VentasCilindro.pdf', blob, { replace: true }).then(async (fileEntry) => {
            // tslint:disable-next-line: no-shadowed-variable
            const toast = await this.toastCtrl.create({
              message: '¡PDF creado exitosamente!',
              mode: 'ios',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();


            this.fileOpener.open(
              this.file.externalDataDirectory + 'VentasCilindro.pdf',
              'application/pdf'
            );
          });
      });
      loading.dismiss();
      return true;
    }

    const toast = await this.toastCtrl.create({
      message: '¡PDF creado exitosamente!',
      mode: 'ios',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
    this.pdf.download();
    loading.dismiss();
  }

async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Alerta',
    message: 'Debe cargar los registros',
    mode: 'ios',
    buttons: ['OK']
  });
  await alert.present();
}

async presentAlertNo() {
  const alert = await this.alertController.create({
    header: 'Alerta',
    message: 'No hay registros.',
    mode: 'ios',
    buttons: ['OK']
  });
  await alert.present();
}
}

