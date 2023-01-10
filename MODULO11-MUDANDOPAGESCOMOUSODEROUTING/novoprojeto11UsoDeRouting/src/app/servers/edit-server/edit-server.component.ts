
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {  ///essa segunda interface será implementada PARA FAZER NOSSA GUARD DE 'CanDeactivateGuard' FUNCIONAR.... --> E ELA NOS __ OBRIGA__ a adicionar o method de 'canDeactivate()'...
  server: { id: number; name: string; status: string };

  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // this.server = this.serversService.getServer(1)!;

//aqui temos 2 MANEIRAS DE RETRIEVAR A DATA PASSADA POR QUERY PARAMS, EXATAMENTE COMO ANTES (a maneira que usa o approach de 'subscribe' ao 'this.route.queryParams' ou algo do gênero, ou então o APPROACH QUE TIRA UMA SNAPSHOT DO MOMENTO EM QUE ESSE COMPONENT É RENDERIZADO....)

  //  const serverId =  this.route.snapshot.queryParams['allowEdit'];
  //  const fragmentLoading = this.route.snapshot.fragment;


   this.route.queryParams.subscribe(
     (queryParams: Params) => {
       console.log(queryParams['allowEdit']);
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false ;

          const id = this.route.snapshot.params['id'];
          this.server = this.serversService.getServer(+id)!; //ainda assim, só conseguimos editar o server de número '3'...


          this.serverName = this.server.name;
          this.serverStatus = this.server.status;
     }
   )


  // this.server = this.serversService.getServer(1)!;
    // this.serverName = this.server.name;
    // this.serverStatus = this.server.status;
  }






 
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {  ///esse method será chamado SEMPRE QUE TENTARMOS DAR 'LEAVE' nessa nossa page de 'edit-component'...
    if (!this.allowEdit) {
      return true;
  }
    if ( (this.serverName !== this.server.name || this.serverStatus !== this.server.status ) && !this.changesSaved) {

        return confirm('Discard server changes?'); /////nunca havia usado, mas é muito legal.. é um prompt de 'confirm', 'sim ou não'... (o próprio browser nos mostra)...

    } else {
      return true;
    }
  }





  onUpdateServer() {

    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });

    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});  ///vai 'JUMP' 1 nível acima, À route de 'the last loaded server'...

  }



}
