import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplo-component-com-inline-styles',
  templateUrl: './exemplo-component-com-inline-styles.component.html',
  // styleUrls: ['./exemplo-component-com-inline-styles.component.css']

  styles: [ ///aqui vocÊ define os MÚLTIPLOS SELECTORS DOS STYLES A SEREM APLICADOS NA SUA PAGE, de forma 'inline'... (dispensa/afasta o uso de um arquivo css externo...)
    `
      h3 {
        color: dodgerblue;
      }

  
  `
] 
})
export class ExemploComponentComInlineStylesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
