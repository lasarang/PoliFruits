import { Component ,OnInit, OnChanges, HostBinding, Input, SimpleChanges } from '@angular/core';
import {FruitService} from '../../services/fruit.service';
import {SideBarService} from '../../services/side-bar.service';

import {Fruit} from '../../models/fruit';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

import {Observable} from 'rxjs';

import * as myGlobals from '../../models/global';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit {
  fruits = [];
  editingFruit: Fruit;
  editing: boolean = false;


  fruitsCollection: AngularFirestoreCollection<Fruit>;
  frutas: Observable<Fruit[]>;
  
  constructor(public fruitService:FruitService,  private sideBarService: SideBarService) { 

  }

  @HostBinding('class.is-open')
  isOpen = true;


  ngOnInit(){ 
    
   this.fruitService.getFruits().subscribe(fruits  => {
      console.log(fruits);
      this.fruits = fruits;
    })
    //console.log(this.fruits)
    
  
    this.sideBarService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    
  
  }

  @Input() dispenserUrl: string;

  /*
  ngOnChanges(changes: SimpleChanges){
    console.log('inside ngOnChanges: '+this.dispenserUrl);
    
     this.fruitService.getFruitsByDispenser(this.dispenserUrl).subscribe((fruits)  => {
      console.log(fruits);
      this.fruits = fruits;
    })
    
  }
  */
  @Input()
  changeFruits(url){
    console.log("changeFruits")
    this.dispenserUrl= url;
    console.log('new dispenserUrl: '+ this.dispenserUrl);
    //this.fruitService.getFutas(this.dispenserUrl);
/*
    this.fruitService.getFruitsByDispenser(this.dispenserUrl).subscribe(fruits  => {
      console.log(fruits);
      this.fruits = fruits;
  
    })
*/
  

   

  }


  deleteFruit(event, fruit){
   if(confirm("¿Estás seguro de querer eliminarlo?")){
      this.fruitService.deleteFruit(fruit);
   }

  }

  editFruit(event, fruit){
    this.editingFruit=fruit;
    this.editing = !this.editing;
  }

  updateFruit(){
    this.fruitService.updateFruit(this.editingFruit);
    this.editingFruit = {} as Fruit;
    this.editing =false;
    
  }



}