import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ServersService } from './servers.service';


@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {



  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService, 
    private router: Router, ///vamos usar o PACOTE de 'router' _ PARA CONSEGUIR 'NAVIGATE PROGRAMMATICALLY'...
    private route: ActivatedRoute  ///você deve usar esse pacote de 'ActivatedRoute' __ SE VOCê ACHA _ QUE VAI PASSAR UM 'RELATIVE PATH' ao 'this.router.navigate()'...
    ///'route: ActivatedRoute' representa a ROUTE em que o PAGE-CCOMPONENT 'servers' EXISTE, ou seja, a 'currently activated route', que é representada dentro desse nosso próprio código de 'servers.component.ts'....
    
    ) { }   

  ngOnInit(): void {
    this.servers = this.serversService.getServers();
  }


  onReload() {  //aqui mostramos como é o pass de um RELATIVE PATH a esse method de 'navigate', que faz o navigate programático...
      this.router.navigate(['servers'], { // o segundo parâmetro é o CONFIG OBJECT desse method, que vai ALTERAR A MANEIRA PELA QUAL OCORRE O 'navigate'...
          relativeTo: this.route,   ///o 'relativeTo' default é o 'ROOT DOMAIN' de nosso app, que nesse caso é 'localhost:4200'...

          queryParams: { }
      })    
  }

}
