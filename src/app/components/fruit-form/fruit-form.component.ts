import { Component, OnInit } from '@angular/core';

import {FruitService} from '../../services/fruit.service';
import {Fruit} from '../models/fruit';



@Component({
  selector: 'app-fruit-form',
  templateUrl: './fruit-form.component.html',
  styleUrls: ['./fruit-form.component.css']
})
export class FruitFormComponent implements OnInit {
  fruit={} as Fruit;

  constructor(public fruitService: FruitService) { 
    
  }

  ngOnInit() {
  }

  addFruit(){
  //  console.log(this.fruit)

  if(this.fruit.nombre !=='' && this.fruit.cantidad!==0)
    this.fruitService.addFruit(this.fruit);
    this.fruit= {} as Fruit;
  }

}