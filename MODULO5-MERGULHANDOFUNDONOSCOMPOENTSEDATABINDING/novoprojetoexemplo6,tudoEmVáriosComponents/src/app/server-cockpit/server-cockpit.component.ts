import { Component, ElementRef, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Output } from '@angular/core';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-server-cockpit',
  templateUrl: './server-cockpit.component.html',
  styleUrls: ['./server-cockpit.component.css'],
})
export class ServerCockpitComponent implements OnInit {
  // newServerContent: string = '';  ///usado com TWOWAYBINDING em 'server-cockpit.element.html', naquele trecho de [(ngModel)]="newServerName", no input field...
  // newServerName: string = '';  ////trocamos isso por 'LOCAL REFERENCES' lá no template (mas esse approach de twoway databinding também funcionaria..)





    @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;   ///usado NO LUGAR DE TWO WAY BINDING (para conseguir ACESSO AO ELEMENTO INPUT referenciado pela local reference de '#serverContent' _ DENTRO DESSE NOSSO CÓDIGO TYPESCRIPT)....





    ///o argumento (..., {static: true/false})  É OBRIGATÓRIO __ no angular 8+
    //ElementRef é sempre o TYPE obtido por '@ViewChild', a partir dos elementos html (sejam eles custom ou não)...


    ///'ElementRef' é um ANGULARTYPE....






  // @Output() serverCreated = new EventEmitter<{ ///sem o uso de ALIAS para o nosso custom event.... (apelido)
    @Output('serverCreated2') serverCreated = new EventEmitter<{  ////__ COM___ O USO DE ALIAS PARA NOSSO CUSTOM EVENT que definimos aqui (apelido, será de 'serverCreated2')
    serverName: string;
    serverContent: string;
  }>(); ///é o completo inverso de '@Input', pq é usado para TRANSMITIR NOSSA DATA obtida em 1 CHILD COMPONENT ("cockpit") PARA__ OS NOSSOS PARENT COMPONENTS (o component 'app', nesse caso, que precisa da DATA obtida nos inputs de 'cockpit' para CONSEGUIR ADICIONAR UM NOVO SERVER no array de 'servers' que possui)....

  // @Output() blueprintCreated = new EventEmitter<{ ///código SEM O ASSIGN DE ALIAS AO NOSSO 'CUSTOM EVENT'
  @Output('blueprintCreated2') blueprintCreated = new EventEmitter<{ ////código COM O ASSIGN DE ALIAS (apelido, aquele 'blueprintCreated2') ao nosso CUSTOM EVENT....
    blueprintName: string;
    blueprintContent: string;
  }>(); ///DENTRO DOS '<>' (PQ EVENTEMITTER É UM GENERIC TYPE) você simplesmente define o TIPO DE DATA QUE VOCÊ VAI EMTITR POR MEIO DESSA PROPRIEDADE...
  ///vamos querer emitir o event type CUSTOM de {}, um objeto contendo a DATA QUE DESEJAMOS USAR lá em 'onServerAdded()'...
  ////vocÊ deve acrescentar '()' ao final, para _ CHAMAR O CONSTRUCTOR DE 'EventEmitter', que agora ficará armazenado nessa property...

  ///o '@Output()' também é necessário, pois é ele que vai nos deixar 'EMIT' esses events (emittados por meio desses eventEmitters) para FORA_ DE NOSSO COMPONENT 'server-cockpit'...

  ngOnInit(): void {}

  onAddServer(nameInput: HTMLInputElement) {
    //// this.serverElements.push({ ///este código não funcionará, pois esse array ficou lá em 'app.element.ts'...
    //  // type: 'server',
     // // name: this.newServerName,
    //  // content: this.newServerContent,
   // // });

    console.log(nameInput)
    console.log(nameInput.value)

    // this.serverCreated.emit( //approach que usa a LOCAL REFERENCE E O METHOD DE 'onAddServer()' PARA PASSAR ESSA REFERENCE....
    //   ///usamos esse method que existe DENTRO DE CADA 'eventEmitter'.. --> esse method faz o 'emit' de um NOVO EVENT do type que vocÊ definiu em '<>'....

    //   {
    //     // serverName: this.newServerName,
    //     serverName: nameInput.value,
    //     serverContent: this.newServerContent,
    //   }
    // );

    //aqui temos o approach de 'ViewChild()' usado para PASSAR NOSSO ELEMENTO/REFERÊNCIA AO ELEMENTO '<input>' através da LOCAL REFERENCE de '#serverContentInput' lá no html, que foi passada ao nosso código typescript através de 'viewChild'...... 
      console.log(this.serverContentInput)


    this.serverCreated.emit(
      {
        serverName: nameInput.value,
        serverContent: this.serverContentInput.nativeElement.value ///'nativeElement' nos dá o UNDERLYING ELEMENT( que, no caso, é um input element)....

      }
    )


  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    // this.serverElements.push({
    //   type: 'blueprint',
    //   name: this.newServerName,
    //   content: this.newServerContent,
    // });

    console.log(nameInput.value)

    // this.blueprintCreated.emit({
    //   blueprintName: nameInput.value,
    //   blueprintContent: this.newServerContent,
    // });


    this.blueprintCreated.emit({
      blueprintName: nameInput.value,
      blueprintContent: this.serverContentInput.nativeElement.value
    });
  }


}
