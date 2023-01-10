import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplo-two-way-databinding',
  templateUrl: './exemplo-two-way-databinding.component.html',
  styleUrls: ['./exemplo-two-way-databinding.component.css'],
})
export class ExemploTwoWayDatabindingComponent implements OnInit {
  ngOnInit(): void {}

  allowNewServer = false;
  serverCreationStatus = false;
  // serverName = '';
  serverName = 'TESTSERVER'

  constructor() {
    setTimeout(
      () => {
        this.allowNewServer = true;
      },

      2000
    );
  }

  toggleServer() {
    this.serverCreationStatus = !this.serverCreationStatus;
  }

  onUpdateServerName(event: Event) {
    // console.log(event.target.value)  ###sem DEFINIÇÃO TYPESCRIPT.
    // this.serverName = event.target.value;
    console.log((<HTMLInputElement>event.target).value); ///COM DEFINIÇÃO TYPESCRIPT.
    this.serverName = (<HTMLInputElement>event.target).value;
  }



  restoreServerName() {
    this.serverName = 'RESTORED';
  }


  
}
