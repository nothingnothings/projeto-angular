import { Injectable, Output } from '@angular/core';
// import { EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';  //// VAMOS QUERER USAR UM SUBJECT, EM VEZ DE UM EVENT EMITTER, pq é mais recomendaod...

@Injectable()
export class ActivateService {
//   @Output() activateEmitter = new EventEmitter<boolean>();


  activatedEmitterWithSubject = new Subject<boolean>()  ///vai emitir um BOOLEAN, exatamente como 'eventEmitter'...


  // onActivateService(boolean: boolean) { ///COM O USO DE EVENTEMITTER ('.emit()', como podemos observar)
  //   this.activateEmitter.emit(boolean);
  // }


//   onActivateService(boolean: boolean) { //nem mesmo precisamos desse helper method, basta usar aquele subject diretamente...


    
//     this.activatedEmitterWithSubject.next(boolean);  ///// COM O USO DE 'new Subject()'..., e com o method de 'next()'....
// ///COM 'subjects' É possvel  chamar 'NEXT'  DO _ lADO DE _FORA DO OBSEVABLE..
 



//   }
}
