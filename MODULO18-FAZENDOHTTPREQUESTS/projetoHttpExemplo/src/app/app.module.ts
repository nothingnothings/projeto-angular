import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostsHttpService } from './postsHttp.service';
import { AuthInterceptorService } from './authInterceptor.service';

import { LoggingInterceptor } from './exemploMultiInterceptorsLogging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    PostsHttpService,


    //A __ ORDEM_ DOS INTERCEPTORS IMPORTA... 
      ////é assim que PROVIDENCIAMOS MÚLTIPLOS INTERCEPTORS...

      //interceptor NÚMERO 1
    {   ///é assim que instalamos um 'INTERCEPTOR' no nosso app... --> precisamos dessas 3 keys, para conseguir fazê-lo funcionar...
      provide: HTTP_INTERCEPTORS,  ///sempre você fornecerá esse value....
      useClass: AuthInterceptorService, ///aponte ao seu ACTUAL INTERCEPTOR --> essa class desse arquivo será adicionada como um INTERCEPTOR..
      multi: true  //isso comunica ao angular se no seu app EXISTEM/EXISTIRÃO  MÚLTIPLOS INTERCEPTORS, e que você quer que sejam todos executados (e que não ocorra 'overwrite' de 1 em cima do outro)....
    },

    {  ////INTERCEPTOR NÚMERO 2
      provide: HTTP_INTERCEPTORS,  
      useClass: LoggingInterceptor, 
      multi: true  
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }















////sintaxe ''''

//   ESSA É A SINTAXE DE 'DEPENDENCY INJECTION' suportada pelo angular...  -> ELA TE DEIXA REGISTRAR UM SERVICE DEBAIXO DE UM _IDENTIFIER __ DIFERENTE.... E TAMBÉM TE DEIXA __ TER MÚLTIPLOS SERVICES SOB ESSE MESMO IDENTIFIER...

//     {   ///é assim que instalamos um 'INTERCEPTOR' no nosso app... --> precisamos dessas 3 keys, para conseguir fazê-lo funcionar...
  //       provide: HTTP_INTERCEPTORS,  ///sempre você fornecerá esse value....
///      useClass: AuthInterceptorService, ///aponte ao seu ACTUAL INTERCEPTOR --> essa class desse arquivo será adicionada como um INTERCEPTOR..
///       multi: true  //isso comunica ao angular se no seu app EXISTEM/EXISTIRÃO  MÚLTIPLOS INTERCEPTORS, e que você quer que sejam todos executados (e que não ocorra 'overwrite' de 1 em cima do outro)....
///       }
// 
// 
// 
