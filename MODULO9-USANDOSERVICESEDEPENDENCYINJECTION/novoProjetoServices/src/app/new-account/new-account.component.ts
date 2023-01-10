import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

// import { LoggingService } from '../logging.service';   //services NÃO DEVEM SER IMPORTADOS E USADOS ASSIM (com instanciação da class... isso é errado)..

// @Component({                               /////////////SEM USO DE 'SERVICES' para o transfer de data das accounts...
//   selector: 'app-new-account',
//   templateUrl: './new-account.component.html',
//   styleUrls: ['./new-account.component.css'],
//   providers: [LoggingService]   //// 1 NECESSÁRIO PARA IMPORTAR SERVICES NO SEU COMPONENT (component de 'NewAccountComponent')....
// })
// export class NewAccountComponent implements OnInit {

//   @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

//   onCreateAccount(accountName: string, accountStatus: string) {
//     this.accountAdded.emit(
//       {
//         name: accountName,
//         status: accountStatus
//       }
//     );
//     // console.log('A server status changed, new status: ' + accountStatus);

//     // const service = new LoggingService();  /////MANEIRA ERRADA DE USAR UM 'SERVICE'... -> você NÃO DEVE CRIAR AS INSTANCES MANNUALMENTE, DIZ O PROFESSOR..
//     // service.logStatusChange(accountStatus);
//     this.LoggingService.logStatusChange(accountStatus);  ///// 3 uso de SERVICE NO NOSSO CÓDIGO... ('LoggingService')..
//   }

//   constructor(private LoggingService: LoggingService) {   /// 2 É ASSIM _ QUE__ USAMOS O 'dependency  injector' do ANGULAR --> é assim que usamos SERVICES, nós os INCORPORAMOS COMO PROPRIEDADES DE NOSSOS COMPONENTS...

//    }

//   ngOnInit(): void {
//   }

// }

@Component({
  /////////////COM USO DE 'SERVICES' para o transfer de data das accounts...
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]   //// 1 NECESSÁRIO PARA IMPORTAR SERVICES NO SEU COMPONENT (component de 'NewAccountComponent')....
})
export class NewAccountComponent implements OnInit {
  @Output() accountAdded = new EventEmitter<{ name: string; status: string }>();

  onCreateAccount(accountName: string, accountStatus: string) {
    // this.accountAdded.emit(
    //   {
    //     name: accountName,
    //     status: accountStatus
    //   }
    // );
    // console.log('A server status changed, new status: ' + accountStatus);

    // const service = new LoggingService();  /////MANEIRA ERRADA DE USAR UM 'SERVICE'... -> você NÃO DEVE CRIAR AS INSTANCES MANNUALMENTE, DIZ O PROFESSOR..
    // service.logStatusChange(accountStatus);
    // this.loggingService.logStatusChange(accountStatus);  ///// 3 uso de SERVICE NO NOSSO CÓDIGO... ('LoggingService')..
    this.accountsService.addAccount(accountName, accountStatus); ////outro uso de SERVICE no nosso código...
  }

  constructor(
    // private loggingService: LoggingService,
    private accountsService: AccountsService  /// 2 É ASSIM _ QUE__ USAMOS O 'dependency  injector' do ANGULAR --> é assim que usamos SERVICES, nós os INCORPORAMOS COMO PROPRIEDADES DE NOSSOS COMPONENTS...

  ) {
   
    this.accountsService.statusUpdated.subscribe((status: string) => {
      //usado a partir do 'EventEmitter' que criamos e armazenamos na variable de 'statusUpdated', lá no service de 'accounts.service.ts' (que também é responsável pelo fire de nosso event, através desse mesmo eventEmitter)..
      return alert('New status: ' + status);
    });
  }

  ngOnInit(): void {}
}
