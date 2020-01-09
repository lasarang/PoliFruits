import { Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Dispenser} from '../models/dispenser';
import {Fruit} from '../models/fruit';


@Injectable( {
  providedIn: 'root'
})
export class DispenserService {

  dispenserCollection: AngularFirestoreCollection<Dispenser>;
  dispensers: Observable<Dispenser[]> ;
  dispenserDoc: AngularFirestoreDocument<Dispenser>;


  constructor(public db: AngularFirestore) {
    this.dispenserCollection= this.db.collection('markers');
    this.dispensers=this.dispenserCollection.snapshotChanges().pipe(map(actions
    => {
      return actions.map(a=> {
        const data = a.payload.doc.data() as Dispenser;
        data.id=a.payload.doc.id;
    
        return data;
      });
    }));

   }

  getDispensers(){
    return this.dispensers; 
  }

  deleteDispenser(dispenser: Dispenser){
    this.dispenserDoc = this.db.doc(`markers/${dispenser.id}`);
    this.dispenserDoc.delete();
  }

  addDispenser(dispenser: Dispenser){
    this.dispenserDoc = this.db.collection('markers').doc(`${dispenser.id}`);

    this.dispenserDoc.set(dispenser);
  }

  updateDispenser(dispenser: Dispenser){
    this.dispenserDoc= this.db.doc(`markers/${dispenser.id}`);
    
    this.dispenserDoc.update(dispenser);
  }
   
}