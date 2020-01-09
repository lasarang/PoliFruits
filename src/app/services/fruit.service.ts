import {Injectable , Output, EventEmitter} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

import {Fruit} from '../models/fruit';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as myGlobals from '../models/global';

@Injectable({
  providedIn: 'root'
})

export class FruitService {
  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

  fruitsCollection: AngularFirestoreCollection<Fruit>;
  fruits: Observable<Fruit[]> ;
  fruitDoc: AngularFirestoreDocument<Fruit>;


constructor(public db: AngularFirestore) { 

  this.fruitsCollection= this.db.collection('markers/'+'fepol'+'/frutas');

  this.fruits=this.fruitsCollection.snapshotChanges()
    .pipe(map(actions=> {
      return actions.map(a=> {
        const data = a.payload.doc.data() as Fruit;
        data.id=a.payload.doc.id;
        return data;
      });
    }));
}

  getFruits(){
    return this.fruits; 
  }

  getFruitsByDispenser(dispenserUrl:string){
    //console.log('blabla');
    
    /*
    this.fruits= this.db.collection('markers/'+dispenserUrl+'/frutas').valueChanges();
    return this.fruits;
  */

    this.fruitsCollection= this.db.collection('markers/'+myGlobals.dispenserFruits+'/frutas/');

    this.fruits=this.fruitsCollection.snapshotChanges()
    .pipe(map(actions=> {
      return actions.map(a=> {
        const data = a.payload.doc.data() as Fruit;
        data.id=a.payload.doc.id;
        return data;
      });
    }));
    return this.fruits; 

  }
   //Obtiene un gato
  public getFutas(documentId: string) {
    return this.db.collection('markers/'+myGlobals.dispenserFruits+'/frutas/').doc(documentId).snapshotChanges();
  }

  deleteFruit(fruit: Fruit){
    this.fruitDoc = this.db.doc(`markers/fepol/frutas/${fruit.id}`);
    this.fruitDoc.delete();
  }

  addFruit(fruit: Fruit){
    this.fruitsCollection.add(fruit);
  }

  updateFruit(fruit: Fruit){
    this.fruitDoc= this.db.doc(`markers/fepol/frutas/${fruit.id}`);
    this.fruitDoc.update(fruit);
  }

}