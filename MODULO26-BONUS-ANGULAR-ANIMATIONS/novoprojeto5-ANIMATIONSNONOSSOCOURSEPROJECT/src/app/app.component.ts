import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '.';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';


import { isPlatformBrowser } from '@angular/common';   //retorna 'true' ou 'false', a depender se essa linah de código está sendo rodada no SERVER OU NO FRONTEND (Browser)..

import * as AuthActions from './auth/store/authActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    // private authService: AuthService,
    private loggingService: LoggingService,
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private platformId    ///////ESSA É A NOSSA SINTAXE PARA O INJECT DESSE 'platFormId'... (não assignamos a coisa alguma)...
        ////e sim, essa propriedade terá um type de 'any', não há problema com isso.... (é uma exceção)...



  ) {}

  ngOnInit(): void {



    // if (isPlatformBrowser(this.platformId) === true) { ///////ISSO PQ __ SÓ _ VAMOS QUERER _ DISPATCHEAR ESSA ACTION ___ SE ESTIVERMOS NO BROWSER.... ISSO PQ __ É APENAS NO BROWSER QUE RECURSOS COMO a 'localStorage' ficam disponíveis...

      console.log('IN BROWSER');

      


    this.store.dispatch(new AuthActions.AutoLogin()); 
    // }




    this.loggingService.printLog('Hello From AppComponent NgOnInit!');   ////////// isso TAMBÉM SERÁ EXECUTADO NO BROWSER, vai acompanhar auqele 'this.store.dispatch()' digitado dentro de 'isPlatformBrowser', pq tudo dentro de 'ngOnInit()' possui este comportamento...

  }
}
