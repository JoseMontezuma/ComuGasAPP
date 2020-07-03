import { Component, ViewChild, OnInit } from '@angular/core';
import { beneficiariosI } from '../../models/beneficiarios.interface';
import { IonList} from '@ionic/angular';
import { FirebaseService } from '../../servicios/firebase.service';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.page.html',
  styleUrls: ['./comunidad.page.scss'],
})
export class ComunidadPage implements OnInit {
  beneficiarios: Observable <beneficiariosI[]>;
  textoBuscar = '';
  @ViewChild( 'lista' , {static: true})lista: IonList;
  // tslint:disable-next-line: max-line-length
  constructor( private fbService: FirebaseService) { }

  ngOnInit(): void {
    this.beneficiarios = this.fbService.getBeneficiarios();
  }

/// buscar por nombres
buscar( event) {
  this.textoBuscar = event.detail.value;
}

}
