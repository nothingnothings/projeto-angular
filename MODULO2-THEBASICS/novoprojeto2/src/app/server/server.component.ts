


///este component (E TODOS OS OUTROS) podem ser gerados por meio da CLI, por meio do comando 'ng generate component COMPONENTNAME'....
//O SHORTCUT PARA O GENERATE DOS COMPONENTS NO CLI é 'ng g c' (ng generate components), e aí o COMPONENT NAME QUE VOCÊ QUER...


import { Component } from '@angular/core'; ////ISTO É NECESSÁRIO, PQ COMUNICA AO TYPESCRIPT QUE vamos querer definir um component/usar aqule decorator de COMPONENT..
////angular é subdividido em diversas PACKAGES, uma delas é o 'core', que é SUPER IMPORTANTE...

@Component(
  //uma das partes MAIS IMPORTANTES DO ANGULAR...
  {
    selector: 'app-server',
    templateUrl: './server.component.html',
    // styleUrls: []
      styles: [ `
      .online {
        color: white;
      }

      `
    ]

  }
)
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = 'offline';

  
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline'
}


  getServerStatus() {
    return this.serverStatus;
  }



  getColor() {
    if (this.serverStatus === 'online') {
      return 'green'
    }

    return 'red'
  }

}
