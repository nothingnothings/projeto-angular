import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  ////vamos querer EXPORTAR E USAR ESSA INTERFACE (e interfaces são só tipo CLASS TYPES _ QUE OBRIGAM O USER A ESCREVER CERTA LÓGICA NO SEU INTERIOR)....

  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean; //esse method será obrigatório, e deverá retornar esses values com esses types aí...
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> { //// essa é NOSSA __ GUARD__ DE 'CanDeactivateGuard' DE VERDADE, que vai ser CONECTADA AO COMPONENT EM QUE QUEREMOS QUE SEJA IMPLEMENTADA.. 



  //vai IMPLEMENTAR a interface vista logo acima, que vai o OBRIGAR A TER ESSE METHOD DE 'canDeactivate() {}', e que esse method retorne aqueles types ali...




  canDeactivate(component: CanComponentDeactivate, ///ESSE É O METHOD que vai ser EXECUTADO _ PELO ANGULAR _ QUANDO TENTARMOS DAR 'LEAVE' de uma route.... 
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot , 
    nextState?: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {   


            return component.canDeactivate();  ///vai rodar o method 'canDeactivate()' que tivermos definido DENTRO DE NOSSO PRÓPRIO COMPONENT.. 
                        ///esse return aqui é a RAZÃO DA NECESSIDADE DAQUELA 'interface' vista logo acima, que definimos PARA _ ESTABELECER UMA CONEXÃO ENTRE NOSSO COMPONENT E ESSA GUARD (necessário vínculo entre GUARD e COMPONENT para criar esse comportamento de 'você não pode sair dessa page sem confirmar que você quer sair, etc')

  }
}
