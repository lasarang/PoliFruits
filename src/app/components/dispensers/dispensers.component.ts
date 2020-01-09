import {Component, Output, EventEmitter, HostListener, OnInit} from '@angular/core';
import {Dispenser} from '../../models/dispenser';
import {DispenserService} from '../../services/dispenser.service';
import {FruitService} from '../../services/fruit.service';
import {FruitsComponent} from '../fruits/fruits.component'

import { SideBarService } from '../../services/side-bar.service';

import * as myGlobals from '../../models/global';

import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-dispensers',
  templateUrl: './dispensers.component.html',
  styleUrls: ['./dispensers.component.css']
})
export class DispensersComponent implements OnInit{
  dispensers = [];
  editingDispenser: Dispenser;
  editing: boolean = false;
  latitude: number;
  longitude: number;


  constructor(public dispenserService:DispenserService, private sideBarService: SideBarService) { }

  @HostListener('click')
  click() {
    this.sideBarService.toggle();
  }


  ngOnInit() {
     this.dispenserService.getDispensers().subscribe(dispensers => {
      console.log(dispensers);
      this.dispensers = dispensers;
    })
      /*
     this.editingDispenser.coords = {
      location: new firebase.firestore.GeoPoint(this.latitude, this.longitude)
    };
    */
  }

  deleteDispenser(event, dispenser){
   // console.log(fruit);

   if(confirm("¿Estás seguro de querer eliminarlo?")){
      this.dispenserService.deleteDispenser(dispenser);
   }

  }

  editDispenser(event, dispenser){
    //console.log(fruit)

    this.editingDispenser=dispenser;
    this.latitude = dispenser.coords.latitude;
    this.longitude = dispenser.coords.longitude;
    this.editing = !this.editing;
  }

  message:string="Hello, I Love You"
  frutasController : FruitsComponent;
  @Output() messageEvent = new EventEmitter<string>();

  showFruits(event, dispenser){
    console.log(dispenser.id);
    this.messageEvent.emit(this.message);
    //myGlobals.dispenserFruits= (dispenser.id).toString();
    this.frutasController = new FruitsComponent();
    this.frutasController.changeFruits(dispenser.id);
    
  }

  updateDispenser(){
    
    //const locationData = new firebase.firestore.GeoPoint(this.latitude , this.longitude);

   this.editingDispenser.coords=new firebase.firestore.GeoPoint(this.latitude, this.longitude);
    
    this.dispenserService.updateDispenser(this.editingDispenser);
    this.editingDispenser = {} as Dispenser;
    this.latitude=0;
    this.longitude=0;
    this.editing =false;
    
  }

}