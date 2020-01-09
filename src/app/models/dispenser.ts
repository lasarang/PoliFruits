//import {AngularFirestore} from '@angular/fire/firestore';
//import * as firebase from 'firebase/app'

import {Observable} from 'rxjs';
import {Fruit} from './fruit'

export interface Dispenser{
  id: string;
  //coords: [number, number];
  coords: firebase.firestore.GeoPoint;
  lat: number;
  long: number;
  estado: string;
  rating: string;
  title: string;
}

