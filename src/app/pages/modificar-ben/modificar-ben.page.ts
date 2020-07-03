import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { beneficiariosI } from '../../models/beneficiarios.interface';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-ben',
  templateUrl: './modificar-ben.page.html',
  styleUrls: ['./modificar-ben.page.scss'],
})
export class ModificarBenPage implements OnInit, AfterViewInit {
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
  constructor( private activatedRoute: ActivatedRoute,
               private fbService: FirebaseService,
               private router: Router,
               private toastCtrl: ToastController,
               private loadingCtrl: LoadingController
             ) { }
  ngOnInit() { }
  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.fbService.getBeneficiario(id).subscribe(beneficiarioData => {
        this.beneficiario = beneficiarioData;
      });
    }
  }
 async updateBeneficiario() {
  const loading = await this.loadingCtrl.create({
    mode: 'ios',
    message: 'Realizando Registro...',
    spinner: 'lines-small'
  });
  await loading.present();
  this.fbService.updateBeneficiario(this.beneficiario).then(() => {
       // tslint:disable-next-line: quotemark
     this.showToast("Registro Actualizado");
     this.router.navigate(['/comunidad']);
    }, err => {
    });
  loading.dismiss();
  return true;
  }
  async deleteBeneficiario() {
    const loading = await this.loadingCtrl.create({
      mode: 'ios',
      message: 'Realizando Registro...',
      spinner: 'lines-small'
    });
    await loading.present();
    this.fbService.deleteBeneficiario(this.beneficiario.id).then(() => {
      // tslint:disable-next-line: quotemark
      this.showToast("Registro Eliminado");
      this.router.navigateByUrl('/comunidad');
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

