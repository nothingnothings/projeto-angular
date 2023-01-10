import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'app-servers', /// QUANDO VOCÊ ESCREVE ASSIM, ESTÁ SELECIONANDO O ELEMENTO NO 'servers.component.html' A PARTIR DA SUA TAG/ELEMENT...
  selector: '[app-servers]', ////o selector do angular TEM COMPORTAMENTO SIMILAR A SELECTORS CSS... -> e nos selectors css, se você escreve '[attributeName] {}', você ACABA EDITANDO TODOS OS ELEMENTOS QUE POSSUEM ESSE ATTRIBUTE ATIVADO/ESCRITo...

  // selector: '.app-servers' ////use essa sintaxe se vocÊ quer SELECIONAR UM ELEMENTO NO seu 'servers.component.html' POR MEIO DE _ CLASSES__...

  ///ou seja, 3 approaches para SELECIONAR ELEMENTOS NO NOSSO CÓDIGO HTML ANGULAR, com o 'selector':

  //  1) por ELEMENTo... -> selector: 'app-servers'
  //  2) por ATTRIBUTE.... -> selector: '[app-servers]'
  //  3) por CLASS --> selector: '.app-servers'

  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus: any = false;
  serverName = '';
  servers: string[] = [];

  constructor() {
    setTimeout(
      () => {
        this.allowNewServer = true;
      },

      2000
    );
  }



  toggleServer() {
    this.serverCreationStatus =  !this.serverCreationStatus
  }


  onUpdateServerName(event: Event) {
      // console.log(event.target.value)  ###sem DEFINIÇÃO TYPESCRIPT.
      // this.serverName = event.target.value; 
      console.log((<HTMLInputElement>event.target).value);  ///COM DEFINIÇÃO TYPESCRIPT.
      this.serverName = (<HTMLInputElement>event.target).value;
  }

  ngOnInit(): void {}


  showServerName() {
    return this.serverName;
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
    this.servers.push(this.serverName);
    console.log(this.servers)
}

}
