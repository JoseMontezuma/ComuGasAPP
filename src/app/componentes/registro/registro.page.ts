import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public name: string;
  public email: string;
  public password: string;
  constructor(private toastCtrl: ToastController , private auth: AuthService, private router: Router, public menuCtrl: MenuController) { }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }
   ionViewWillLeave() {
     this.menuCtrl.enable(true);
    }
  ngOnInit() {
  }
  OnSubmitRegister() {
    this.auth.register(this.email, this.password, this.name).then( auth =>  {
      // tslint:disable-next-line: quotemark
      this.showToast("Registro Exitoso");
      this.router.navigate(['home']);
      console.log(auth); }).catch(err => console.log(err));
    }
  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 1000
     }).then(toastData => toastData.present());
  }
}
