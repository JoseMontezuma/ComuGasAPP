import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { GasI } from '../models/gas.interface';
// tslint:disable-next-line: no-use-before-declare
import Timestamp = firestore.Timestamp;
import { firestore } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class GasService {
  private ventasGas: Observable<GasI[]>;
  private gasCollection: AngularFirestoreCollection<GasI>;

  constructor(private afs: AngularFirestore) {
    // defino la coleccion
    // tslint:disable-next-line: quotemark
    this.gasCollection = this.afs.collection<GasI>('ventasGas', ref => ref.orderBy("fechaGas", "desc"));
    // obtengo la data
    this.ventasGas = this.gasCollection.snapshotChanges().pipe(
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
  // obtengo todos los registros de ventas de Gas
  getVentasGas(): Observable<GasI[]> {
    return this.ventasGas;
  }
  // obtengo registro de venta de Gas
  getVentaGas(id: string): Observable<GasI> {
    return this.gasCollection.doc<GasI>(id).valueChanges().pipe(
        take(1),
        map(ventaGas => {
          ventaGas.id = id;
          return ventaGas;
        })
    );
  }
  // crear una Venta de Gas
  addVentaGas(ventaGas: GasI): Promise<DocumentReference> {
    return this.gasCollection.add(ventaGas);
  }
  // actualizar una Venta de Gas
  updateVentaGas(ventaGas: GasI): Promise<void> {
    return this.gasCollection.doc(ventaGas.id).update({
        cedulaGas: ventaGas.cedulaGas,
        nombreGas: ventaGas.nombreGas,
        apellidoGas: ventaGas.apellidoGas,
        fechaGas: ventaGas.fechaGas,
        tamanoGas: ventaGas.tamanoGas,
        cantidadGas: ventaGas.cantidadGas,
        

        });
  }
  // eliminar una Venta de Gas
  deleteVentaGas(id: string): Promise<void> {
    return this.gasCollection.doc(id).delete();
  }

}
