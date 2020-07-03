import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService, public router: Router,
              private toastCtrl: ToastController, public menuCtrl: MenuController) { }

ionViewWillEnter() {
 this.menuCtrl.enable(false);
}

ionViewWillLeave() {
  this.menuCtrl.enable(true);
 }

  ngOnInit() {
  }

  OnSubmitLogin() {
   this.authService.login(this.email , this.password).then(res => {
    // tslint:disable-next-line: quotemark
    this.showToast("Bienvenido a ComuGas");
    this.router.navigate(['/home']);
   }).catch(err => alert('Los datos son incorrectos o no existe el usuario'));
  }
  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 1000
     }).then(toastData => toastData.present());
  }
}
