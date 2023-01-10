import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

import { Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: { id: number; name: string };

  constructor(
    private route: ActivatedRoute, /////esse type é essencial para nós, pq é A PARTIR DELE QUE PODEMOS PEGAR OS VALUES DOS 'DYNAMIC SEGMENTS' de nossas urls dinÂmicas... (como 'localhost:4200/users/:id')...
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const selectedUserId: string = this.route.snapshot.params['userId']; ///é com isso que conseguimos o SEGMENTO DINÂMICO NA NOSSA URL (com o userId, o value do userId)...
    // const selectedUserName: string = this.route.snapshot.params['name'];
    console.log(selectedUserId);

    const selectedUser = this.usersService.users.find((user) => {
      return user.id.toString() === selectedUserId;
    });

    this.user = selectedUser!;


    // this.route.params  /////esse é um OBSERVABLE.... ---> funciona com/para ASYNC TASKS, como o CHANGE DA URL/ROUTE no seu browser AO LONGO DO TEMPO, EM 1 MESMO COMPONENT (como o que acontece quando o button de 'Load Anna' é clicado, e nossa url muda para '/users/10/Anna')
    //  .subscribe( ///ele OBSERVA e então EXECUTA CÓDIGO, se a coisa que está observando acontecer.... mas não vai travar a execução de seu código, por isso funciona de forma async... ele faz tipo um SUBSCRIBE, e aí fica esperando....


    //  (newParams: Params) => {  //1o parâmetro de 'subscribe()'..
    //   console.log(newParams);
    //     this.user.id = newParams['userId'];

    //  }

    //  )     
     //E O METHOD DE 'subscribe', em nossos observables, sempre exige TRÊS PARÂMETROS, QUE SERÃO 3 FUNCTIONS...

     ////1o parâmetro --> É O CÓDIGO/FUNCTION QUE DEVE SER DISPARADA __ ASSIM _ QUE 'NOVA DATA' for funnelada através desse observable (no caso de 'this.route.params', essa nova data SERÁ NOVOS PARAMS, NOVOS PARAMS NA NOSSA URL, que terá sido alterada durante a existência desse nosso component...)
  
    }

}
