import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FruitFormComponent } from './components/fruit-form/fruit-form.component';

import { FruitsComponent } from './components/fruits/fruits.component';
import { FruitService } from './services/fruit.service';

import {AngularFireModule} from '@angular/fire';

import {environment} from '../environments/environment';

import {AngularFirestoreModule} from '@angular/fire/firestore';
import { DispensersComponent } from './components/dispensers/dispensers.component';
import { DispenserService } from './services/dispenser.service';
import { DispenserFormComponent } from './components/dispenser-form/dispenser-form.component';
import { SideBarService } from './services/side-bar.service';


@NgModule({
  imports:      [ BrowserModule, FormsModule, AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,   

   ],
  declarations: [ 
    AppComponent, 
    FruitFormComponent,
    FruitsComponent,
    DispensersComponent,
    DispenserFormComponent ,
     ],
  bootstrap:    [ AppComponent ],
  providers: [FruitService, DispenserService, SideBarService
]
})
export class AppModule { }
