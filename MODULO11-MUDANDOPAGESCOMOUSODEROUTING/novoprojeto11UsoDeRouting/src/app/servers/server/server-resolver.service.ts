import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';
















interface Server {
    id: number;
    name: string;
    status: string;
}


@Injectable()
export class ServerResolver implements Resolve<Server> { 
// export class ServerResolver implements Resolve<{id: number, name: string, status: string}> { 
    //esse implement é necessário para TRANSFORMAR ESSA CLASS/SERVICE EM um 'resolver', que é tipo um SERVIÇO ESPECIAL....






constructor(private serversService: ServersService) {

}




////RESOLVERS -> FAZEM O 'RESOLVE' da DATA de seu component/route _ ANTES _ DE ELE SER CARREGADO... (antes de 'ngOnInit()', e antes do constructor do component)...





//a interface de 'Resolve' SEMPRE VAI NOS __ OBRIGAR _ A ESCREVER UM METHOD DE 'resolve()'; e esse method sempre terá os parameters de 'route' e 'state'...
//ex:


resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {

    const params = +route.params['id']; ///podemos acessar os PARAMS de nossa url assim, através DA SNAPSHOT de nossa route...


    return this.serversService.getServer(params)!;


}



}