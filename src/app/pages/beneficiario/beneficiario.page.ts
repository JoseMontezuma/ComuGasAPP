import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { beneficiariosI } from '../../models/beneficiarios.interface';
import { FirebaseService } from '../../servicios/firebase.service';
import { Router} from '@angular/router';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.page.html',
  styleUrls: ['./beneficiario.page.scss'],
})
export class BeneficiarioPage implements OnInit {
  beneficiario: beneficiariosI = {
    cedulaBen: '',
    nombreBen: '',
    apellidoBen: '',
    telefonoBen: '',
    calleBen: '',
    cpBen: '',
    cmBen: '',
    cgBen: '',
  };

  constructor(  private toastCtrl: ToastController,
                private router: Router,
                private fbService: FirebaseService,
                public loadingCtrl: LoadingController ) { }
  ngOnInit() {
  }
 async addBeneficiario() {

    if (!this.formValidation()) {
      const loading = await this.loadingCtrl.create({
        mode: 'ios',
        message: 'Realizando Registro...',
        spinner: 'lines-small'
      });
      await loading.present();
      this.fbService.addBeneficiario(this.beneficiario).then(() => {
      // tslint:disable-next-line: quotemark
      this.showToast("Registro Exitoso");
      this.router.navigateByUrl('/comunidad');
      return true;
    }, err => {
    });
      loading.dismiss();
      return true;
  }
  }
    formValidation() {
      if (!this.beneficiario.cedulaBen) {
        // tslint:disable-next-line: quotemark
        this.showToast("Ingresa el Numero de Cedula");
        return true;
      }
      if (!this.beneficiario.nombreBen) {
        // tslint:disable-next-line: quotemark
        this.showToast("Ingresa el Nombre");
        return true;
      }
      if (!this.beneficiario.apellidoBen) {
        // tslint:disable-next-line: quotemark
        this.showToast("Ingresa el Apellido");
        return true;
      }

      if (!this.beneficiario.telefonoBen) {
        // tslint:disable-next-line: quotemark
        this.showToast("Ingresa el Telefono de Contacto");
        return true;
      }
      if (!this.beneficiario.calleBen) {
        // tslint:disable-next-line: quotemark
        this.showToast("Ingresa el Nombre de la calle");
        return true;
      }
      if (!this.beneficiario.cpBen) {
        // tslint:disable-next-line: quotemark
        this.showToast("Cilindros Pequeños que posea");
        return true;
      }

      if (!this.beneficiario.cmBen) {
        // tslint:disable-next-line: quotemark
        this.showToast("Cilindros Medianos que posea");
        return true;
      }

      if (!this.beneficiario.cgBen) {
        // tslint:disable-next-line: quotemark
        this.showToast("Cilindros Grandes que posea");
        return true;
      }
    }
    showToast(message: string) {
      this.toastCtrl.create({
        message,
        duration: 1000
       }).then(toastData => toastData.present());
    }
   }


