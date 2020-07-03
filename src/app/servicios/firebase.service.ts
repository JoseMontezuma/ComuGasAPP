import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { beneficiariosI } from '../models/beneficiarios.interface';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private beneficiarios: Observable<beneficiariosI[]>;
  private beneficiarioCollection: AngularFirestoreCollection<beneficiariosI>;

  constructor(private afs: AngularFirestore) {
    // defino la coleccion
    // tslint:disable-next-line: quotemark
    this.beneficiarioCollection = this.afs.collection<beneficiariosI>('beneficiarios', ref => ref.orderBy("nombreBen", "asc"));
    // obtengo la data
    this.beneficiarios = this.beneficiarioCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }
  // obtengo todos los registros
  getBeneficiarios(): Observable<beneficiariosI[]> {
    return this.beneficiarios;
  }
  // obtengo registro
  getBeneficiario(id: string): Observable<beneficiariosI> {
    return this.beneficiarioCollection.doc<beneficiariosI>(id).valueChanges().pipe(
        take(1),
        map(beneficiario => {
          beneficiario.id = id;
          return beneficiario;
        })
    );

  }
  // creo un nuevo beneficiario
  addBeneficiario(beneficiario: beneficiariosI): Promise<DocumentReference> {
    return this.beneficiarioCollection.add(beneficiario);
  }
  // actualizo un nuevo beneficiario
  updateBeneficiario(beneficiario: beneficiariosI): Promise<void> {
    return this.beneficiarioCollection.doc(beneficiario.id).update({ cedulaBen: beneficiario.cedulaBen,
        nombreBen: beneficiario.nombreBen,
        apellidoBen: beneficiario.apellidoBen,
        telefonoBen: beneficiario.telefonoBen,
        calleBen: beneficiario.calleBen,
        cpBen: beneficiario.cpBen,
        cmBen: beneficiario.cmBen,
        cgBen: beneficiario.cgBen
        });
  }
  // elimino un beneficiario
  deleteBeneficiario(id: string): Promise<void> {
    return this.beneficiarioCollection.doc(id).delete();
   }

}
