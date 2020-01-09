import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  //fruitsAreOpened = false;

  ngOnInit() {
    //this.fruitsAreOpened= true;
  }
/*
  toggleFruits(shouldOpen: boolean) {
    this.fruitsAreOpened = !this.fruitsAreOpened;
  }

*/

message: string;
receiveMessage(event){
  this.message= event;
}

}
