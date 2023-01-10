import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from '../servers.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {


    this.route.data.subscribe(
      (data) => {
          this.server = data['server'];  ///como observado em 'app-routing.module.ts', na route de ':id', de 'ServerComponent'...
      }
  )


    ///////////// ESSE CÓDIGO TODO FUNCIONA, SIM, mas AQUI DECIDIMOS USAR RESOLVERS PARA FAZER 'PRE-LOAD' de nossa data; é um load tão anterior que é ANTERIOR AO 'ngOnInit()' e ao 'constructor' de nosso component...

    // const serverId = +this.route.snapshot.params['id'];

    // this.server = this.serversService.getServer(serverId)!;

    // this.route.params.subscribe( ///versão/modalidade usada para quando 'SEUS PARAMS FOREM ALTERADOS DURANTE A VIDA DE SEU COMPONENT/PAGE  de server'.... --> aí isso vai ALTERAR O CONTENT DA PÁGINA, sem reloads, intuitivamente (pq é um observable, async code, roda no background e detecta CHANGES NOS SEUS 'params' na url, durante o runtime/vida desse component/page de 'server')...
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id'])!;
    //   }
    // )
      
    


  

}


onEdit() {

  this.router.navigate(
    ['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve' ///outros valores possíveis: 'merge' e o 'default' (que é de simplesmente DROPPAR TODOS OS QUERY PARAMS QUANDO OCORRER O NAVIGATE ATÉ OUTRA PAGE, por meio desse 'this.router.navigate()')...
      // queryParams: {allowEdit: 1 }
    }
  )
}

}