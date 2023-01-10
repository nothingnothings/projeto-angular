import { Component } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [AccountsService]  ///1o passo para USAR UM SERVICE em 1 de nossos components... --> queremos que essa instance seja usada/compartilhada/passed down a TODOS OS CHILD COMPONENTS DE 'app.component.ts'...
    //mas como eu escrevi/implementei essa INSTANCE desse service lá em 'app.module.ts', ESSA INSTANCE JÁ ACABA COMPARTILHADA/USADA POR 'app.component.ts', que é SUA CHILD... (child de 'app.module.ts')...

})
export class AppComponent {
  // accounts = [  ////outsourceado para o SERVICE de 'accounts.service.ts'...
  //   {
  //     name: 'Master Account',
  //     status: 'active',
  //   },

  //   {
  //     name: 'Test Account',
  //     status: 'inactive',
  //   },

  //   {
  //     name: 'Hidden Account',
  //     status: 'unknown',
  //   },
  // ];

  // onAccountAdded(newAccount: { name: string; status: string }) { ////outsourceado para o SERVICE de 'accounts.service.ts'...
  //   this.accounts.push(newAccount);
  // }

  // onStatusChanged(updateInfo: { id: number; newStatus: string }) { ////outsourceado para o SERVICE de 'accounts.service.ts'...
  //   this.accounts[updateInfo.id].status = updateInfo.newStatus;
  // }



  accounts: {name: string, status: string}[] = []; //como agora temos esse array de 'accounts' lá em 'accounts.service.ts', DEVEMOS _ INJETAR_ ESSE SERVICE AQUI, nesse component...



  constructor(private accountsService: AccountsService) {} //precisamos disso para INFORMAR o angular de que VAMOS QUERER USAR ESSE SERVICE de 'AccountsService' (que contém nosso ARRAY DE SERVICES E OS METHODS NECESSÁRIOS) dentro desse nosso component...




  ngOnInit() {  ///é executado quando esse component É INICIALIZADO (mas APÓS o constructor)...


    this.accounts = this.accountsService.accounts;   ///assim conseguimos DEFINIR O NOSSO ARRAY DE 'accounts', tipo VAZIO, começa vazio, como tendo um valor EQUIVALENTE A ESSE ARRAY DE 'accounts' que temos LÁ NO SERVICE FILE de 'accounts.service.ts'...
    ///esse é um exemplo de OUTSOURCING extremamente efetivo.
  }



}
