import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { map, take, delay } from 'rxjs/operators';
// tslint:disable-next-line: no-use-before-declare
import Timestamp = firestore.Timestamp;
import { firestore } from 'firebase/app';
import { CilindroI } from '../models/cilindro.interface';



@Injectable({
  providedIn: 'root'
})
export class CilindroService {
  private ventasCilindro: Observable<CilindroI[]>;
  private cilindroCollection: AngularFirestoreCollection<CilindroI>;

  constructor(private afs: AngularFirestore) {
    // defino la coleccion
    // tslint:disable-next-line: quotemark
    this.cilindroCollection = this.afs.collection<CilindroI>('ventasCilindro', ref => ref.orderBy("fechaCilindro", "desc"));
    // obtengo la data
    this.ventasCilindro = this.cilindroCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            Object.keys(data).filter(key => data[key] instanceof Timestamp)
                        .forEach(key => data[key] = data[key].toDate());
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }
  // obtengo todos los registros de ventas de Cilindro
  getVentasCilindro(): Observable<CilindroI[]> {
    return this.ventasCilindro;
  }
  // obtengo registro de venta de Cilindro
  getVentaCilindro(id: string): Observable<CilindroI> {
    return this.cilindroCollection.doc<CilindroI>(id).valueChanges().pipe(
        take(1),
        map(ventaCilindro => {
          ventaCilindro.id = id;
          return ventaCilindro;
        })
    );
  }
  // crear una Venta de Cilindro
  addVentaCilindro(ventaCilindro: CilindroI): Promise<DocumentReference> {
    return this.cilindroCollection.add(ventaCilindro);
  }
  // actualizar una Venta de Cilindro
  updateVentaCilindro(ventaCilindro: CilindroI): Promise<void> {
    return this.cilindroCollection.doc(ventaCilindro.id).update({
        cedulaCilindro: ventaCilindro.cedulaCilindro,
        nombreCilindro: ventaCilindro.nombreCilindro,
        apellidoCilindro: ventaCilindro.apellidoCilindro,
        fechaCilindro: ventaCilindro.fechaCilindro,
        tamañoCilindro: ventaCilindro.tamanoCilindro,
        cantidadCilindro: ventaCilindro.cantidadCilindro
        });
  }
  // eliminar una Venta de Cilindro
  deleteVentaCilindro(id: string): Promise<void> {
    return this.cilindroCollection.doc(id).delete();
  }
}
