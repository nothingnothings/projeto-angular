////esse nosso service de 'route guard' é usado CONJUNTAMENTE com o service __ FAKE__ ed 'auth.service.ts', para exemplificar o funcionamento de 'canActivate' (que pode ser executado/executa código tanto de forma SYNC como ASYNC)....

///OBS:::: ESSA NOSSA 'route guard' É ADICIONADA LÁ NO ARQUIVO DE 'app-routing.module.ts', nas ROUTES QUE DESEJAMOS IMPLEMENTAR UMA 'GUARD'... 

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router'; //precisamos de 'CanActivate' PARA __ DEFINIR ROUTE GUARDS NO NOSSO PROJECT...

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';




@Injectable()
// export class AuthGuard implements CanActivate { ///usamos isso quando queremos que A PARENT ROUTE E TODAS AS CHILDS DELA SEJAM PROTEGIDAS...
  export class AuthGuard implements CanActivate, CanActivateChild {  //já 'CanActivateChild' é usado quando queremos que SÓ AS CHILD ROUTES FIQUEM PROTEGIDAS POR NOSSO GUARD, sem proteger a 'parent route'....



    constructor(private authService: AuthService, private router: Router) {

    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {   ////esse method vai RETORNAR UMA OBSERVABLE (ASYNC CODE).... OU UMA PROMISE (ASYNC CODE), OU UM BOOLEAN SIMPLES (código SYNC)


    return this.authService.isAuthenticated()   ////com isso simulamos o 'authentication proccess' de nosso user (processo assíncrono)...
    .then(
        (authenticated: boolean | unknown) => {  //vamos receber de volta um BOOLEAN, que pode ser ou TRUE OU FALSE...
            if (authenticated) {
                return true;   ///nesse case, o authenticate do user foi constatado (está authenticated), razão pela qual vamos querer garantir acesso a ele, a essa route, seja qual for....
            } else { ///case em que o AUTHENTICATE _ FALHOU__...
                this.router.navigate(['/']);
                return false; //só para calar a boca do typescript.
            }
        }
    )
  }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    

    return this.canActivate(route, state); ////queremos rodar a mesma lógica de 'canActivate()', por isso rodamos ela aqui..
  }

}






////route --> uma snapshot de nossa route 


/////state -> uma snapshot do STATE  de nosso ROUTER..










// -> vamos definir em ALGUM LUGAR QUE 


// O `ANGULAR DEVE EXECUTAR ESSE CÓDIGO DE 


// 'canActivate'



// ___ ANTES_ 


// DE UMA ROUTE SER CARREGADA... ---> E SERÁ POR MEIO DISSO QUE RECEBEREMOS 'route' e 'state'....