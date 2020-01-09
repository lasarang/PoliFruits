import { Component, OnInit } from '@angular/core';

import {DispenserService} from '../../services/dispenser.service';

import {Dispenser} from '../models/dispenser';
//import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app'


@Component({
  selector: 'app-dispenser-form',
  templateUrl: './dispenser-form.component.html',
  styleUrls: ['./dispenser-form.component.css']
})
export class DispenserFormComponent implements OnInit {
  latitude : number;
  longitude: number;
  dispenser={} as Dispenser;

  constructor(public dispenserService: DispenserService) { }



  ngOnInit() {
    

  }

  addDispenser(){
  //  console.log(this.fruit)

  if(this.dispenser.title !=='' && this.dispenser.estado!=='') {

    this.dispenser.coords=new firebase.firestore.GeoPoint(this.latitude, this.longitude);
    this.dispenserService.addDispenser(this.dispenser);
    this.dispenser= {} as Dispenser;

  }
    

   
  }


}