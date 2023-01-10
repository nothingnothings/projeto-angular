
import { Directive, Host } from '@angular/core';

import { Renderer2 } from '@angular/core'; ////uma ferramenta melhor do que utilizar 'elementRef.nativeElement.xxx' para definir coisas de nossos elements...

import { OnInit } from '@angular/core'; ///é mt comum usar esse hook para ESCREVER NOSSAS DIRECTIVES... (mt melhor fazer initialization work lá em 'ngOnInit', e não em 'constructor()')

import { ElementRef } from '@angular/core';

import { HostListener } from '@angular/core';   ////é usado para ESCREVER LÓGICA A PARTIR DE 'EVENTS' que ocorrerem nesse nosso element (como 'click', 'hover', etc)...


import { HostBinding } from '@angular/core';

import { Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';   /////como fazer BIND A PROPRIEDADES DE NOSSA DIRECTIVE...

  @Input() highlightColor: string = 'blue';

  // @HostBinding('style.backgroundColor') backgroundColor2: string = 'transparent';

  @HostBinding('style.backgroundColor') backgroundColor2: string;


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}







  ngOnInit(): void {
    // this.renderer        ////é assim que acessamos o renderer na nossa directive....  --> e ele nos dá um MONTE DE METHODS para manipular nosso element...

    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue'); /// nos deixa SETTAR O STYLE DE ALGUM ELEMENT...  --> o element que nos interessa, em que COLOCAMOS ESSA NOSSA DIRECTIVE, segue sendo referenciado por 'this.elementRef'....
        //você deve passar 'this.elementRef.nativeElement' (o underlying element dessa ELEMENT REFERENCE), e não 'this.elementRef' em si...
  

          //1o parâmetro --> element que queremos estilizar...
          ///2o parametro --> estilo que queremos definir 
          /////3o parametro --> VALOR do estilo que queremos definir 
          ///4o parametro --> FLAGS opcionais que queremos definir para esse style... (tag de '!important', para que o style overwritte outro style), 

  
          this.backgroundColor2 = this.defaultColor;
  
  
        }




  @HostListener('mouseenter') mouseOver(eventData: Event) { ///quando o event especificado em 'hostListener' acontecer ('hover', nesse exemplo), O METHOD DA DIREITA SERÁ DISPARADO...
            //// a eventData é RECEBIDA NESSA PARÂMETRO, SE ASSIM O DESEJARMOS...


            // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red')
            // this.backgroundColor2 = 'yellow';

          this.backgroundColor2 = this.highlightColor;
  }



  @HostListener('mouseleave') mouseLeave(eventData: Event) { 

    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');

      this.backgroundColor2 = this.defaultColor;
}



}
