


///esse service foi INJECTED dentro do component de 'accounts.service.ts'...

import { Injectable } from "@angular/core";

///devemos adicionar '@Injectable()' tanto NO SERVICE QUE RECEBE A INJECTION (que é 'accounts.service.ts', nesse caso) COMO TAMBÉM AQUELE QUE _ É INJETADO (no caso, 'logging.service.ts')...
@Injectable()
export class LoggingService {
  ///não existe um decorator de '@Service()', contrariamente a directives e components (que exigem @Directive e @Component, respectivamente)

  logStatusChange(newStatus: string) {
    //será disparado sempre que o STATE de 1 account for alterado...
    console.log('A server status has changed, new status: ' + newStatus);
  }
}


////obs: nunca importe/use services diretamente nos seus components (ou seja, não use imports, e sim a ferramenta concedida pelo angular, que é...)