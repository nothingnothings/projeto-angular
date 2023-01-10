import { Component, OnInit } from '@angular/core';
import { ExemploService } from '../exemplo.service';

@Component({
  selector: 'app-exemplo2',
  templateUrl: './exemplo2.component.html',
  styleUrls: ['./exemplo2.component.css']
})
export class Exemplo2Component implements OnInit {
  example: {
    name: string;
  }



  constructor() { }

  ngOnInit(): void {
  }

}
