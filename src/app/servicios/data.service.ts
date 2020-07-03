import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { beneficiariosI } from '../models/beneficiarios.interface';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private BeneficiariosCollection: AngularFirestoreCollection<beneficiariosI>;
  private beneficiarios: Observable<beneficiariosI[]>;
  constructor(db: AngularFirestore) {
    this.BeneficiariosCollection = db.collection<beneficiariosI>('beneficiarios');
    this.beneficiarios = this.BeneficiariosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }
  getBeneficiarios() {
    return this.beneficiarios;
  }
  getBeneficiario(id: string) {
    return this.BeneficiariosCollection.doc<beneficiariosI>(id).valueChanges();
  }
  updateBeneficiario(Beneficiario: beneficiariosI, id: string) {
    return this.BeneficiariosCollection.doc(id).update(Beneficiario);
  }
  addBeneficiario(Beneficiario: beneficiariosI ) {
    return this.BeneficiariosCollection.add(Beneficiario);
  }
  removeBeneficiario(id: string) {
    return this.BeneficiariosCollection.doc(id).delete();
  }
  }
