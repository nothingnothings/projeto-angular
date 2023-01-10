import { Component, OnInit } from '@angular/core';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-uso-da-directive-ng-if',
  templateUrl: './uso-da-directive-ng-if.component.html',
  styleUrls: ['./uso-da-directive-ng-if.component.css'],
})
export class UsoDaDirectiveNgIfComponent implements OnInit {
  allowNewServer = false;
  serverCreated = false;

  constructor() {
    setTimeout(
      () => {
        this.allowNewServer = true;
      },

      2000
    );
  }

  ngOnInit(): void {}


  onCreateServer() {
      this.serverCreated = true;
  }

}
