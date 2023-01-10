import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountComponent } from './account/account.component';
import { AccountsService } from './accounts.service';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    NewAccountComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AccountsService, LoggingService], //se colocamos nosso service aqui, no ROOT DE NOSSO APP, a INSTANCE desse service vai acabar COMPARTILHADA POR TODO SEU APP (app-wide), A COMPONENTS, A DIRECTIVES E A OUTROS SERVICES.... (E a todos os child components dos components)...

                ///se quisermos INJETAR 1 SERVICE DENTRO DE OUTRO SERVICE, É NECESSÁRIO ESPECIFICAR ESSE SERVICE AQUI, em 'app.module.ts', nesse array de 'providers'...
                ///AccountsService e LoggingService, juntos, são um EXEMPLO DE 'INJECT DE UM SERVICE DENTRO DE OUTRO SERVICE' (inject do service de 'LoggingService' dentro de 'AccountsService')...
 
                bootstrap: [AppComponent]
})
export class AppModule { }
