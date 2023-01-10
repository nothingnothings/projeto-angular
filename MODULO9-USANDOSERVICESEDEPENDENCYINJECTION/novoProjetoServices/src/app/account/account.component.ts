// import { Component, Input, OnInit, Output } from '@angular/core';
// import { EventEmitter } from '@angular/core';
// import { LoggingService } from '../logging.service';

// @Component({                /////////////SEM  USO DE 'SERVICES' para o transfer de data das accounts...
//   selector: 'app-account',
//   templateUrl: './account.component.html',
//   styleUrls: ['./account.component.css'],
//   providers: [LoggingService]  ///1) USO DE SERVICES (requisito)
// })
// export class AccountComponent implements OnInit {
//   @Input() account: { name: string; status: string };

//   @Input() id: number;

//   @Output() statusChanged = new EventEmitter<{
//     id: number;
//     newStatus: string;
//   }>();

//   constructor(private LoggingService: LoggingService) {} ///2) USO DE SERVICES (requisito)

//   ngOnInit(): void {}

//   onSetTo(status: string) {
//     this.statusChanged.emit({ id: this.id, newStatus: status });
//     // console.log('A server status changed, new status: ' + status);
//     this.LoggingService.logStatusChange(status); //3 USO DE SERVICES (aplicação/uso)....
//   }
// }












import { Component, DoCheck, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AccountsService } from '../accounts.service';
// import { LoggingService } from '../logging.service';

@Component({ /////////////COM USO DE 'SERVICES' para o transfer de data das accounts...
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]  ///1) USO DE SERVICES (requisito)
})
export class AccountComponent implements OnInit {
  @Input() account: { name: string; status: string };

  @Input() id: number;

  // @Output() statusChanged = new EventEmitter<{
  //   id: number;
  //   newStatus: string;
  // }>();

  constructor(
    // private loggingService: LoggingService, ///fizemos INJECT DESSE SERVICE DENTRO DO SERVICE DE 'accountsService'...
    
    private accountsService: AccountsService) {} ///2) USO DE SERVICES (requisito)

  ngOnInit(): void {}

  onSetTo(status: string) {
    // this.statusChanged.emit({ id: this.id, newStatus: status });
    // console.log('A server status changed, new status: ' + status);
    // this.loggingService.logStatusChange(status); //3 USO DE SERVICES (aplicação/uso)....


    // this.accountsService.updateStatus({id: this.id, status: status});

    this.accountsService.statusUpdated.emit(status);
  }


  
}
