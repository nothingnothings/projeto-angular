import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplo-component-com-inline-template',
  template: '<p>exemplo</p>', ////ISSO MOSTRA QUE TAMBÉM É POSSÍVEL DEFINIR 'INLINE TEMPLATES' nos nossos arquivos 'ts' (em vez de usar um template EXTERNO...)
  styleUrls: ['./exemplo-component-com-inline-template.component.css']
})
export class ExemploComponentComInlineTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
