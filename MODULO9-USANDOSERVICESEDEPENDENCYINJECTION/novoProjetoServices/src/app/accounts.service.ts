
import { LoggingService } from './logging.service';


import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()   ////VOCÊ DEVE DECLARAR 'injectable' no service se vocÊ DESEJA INJETAR OUTRO SERVICE DENTRO DELE (nesse caso, 'logging.service.ts')...
export class AccountsService {
  accounts = [
    //tirados lá de 'app.component.html'...
    {
      name: 'Master Account',
      status: 'active',
    },

    {
      name: 'Test Account',
      status: 'inactive',
    },

    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];

  addAccount(name: string, status: string) {
    this.accounts.push({
      name: name,
      status: status,
    });
    this.loggingService.logStatusChange(status);
    
  }

  updateStatus(updateInfo: { id: number; status: string }) {
    this.accounts[updateInfo.id].status = updateInfo.status;
    this.loggingService.logStatusChange(updateInfo.status)
  }

  constructor(private loggingService: LoggingService) {
    ///é assim que fazemos _ INJECT__ DE UM SERVICE DENTRO DE OUTRO (inject de 'LoggingService' dentro de 'AccountsService')...
  }


  statusUpdated = new EventEmitter<string>();     ////emits the NEW STATUS, as a string... --> aqui temos um EXEMPLO DE CROSS-COMPONENT COMMUNICATION, através do eventEmitter e nosso service (ver components 'account' e 'new-account')..
}
