import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';  ///Component criado por nós...
import { ExemploComponent } from './exemplo/exemplo.component';
import { ServersComponent } from './servers/servers.component';
import { ExemploComponentComInlineTemplateComponent } from './exemplo-component-com-inline-template/exemplo-component-com-inline-template.component';
import { ExemploComponentComInlineStylesComponent } from './exemplo-component-com-inline-styles/exemplo-component-com-inline-styles.component';
import { ExemploTwoWayDatabindingComponent } from './exemplo-two-way-databinding/exemplo-two-way-databinding.component';
import { Assignment2componentComponent } from './assignment2component/assignment2component.component';
import { UsoDaDirectiveNgIfComponent } from './uso-da-directive-ng-if/uso-da-directive-ng-if.component';



@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,  ////todo novo component adicionado ao seu projeto deve ser declarado aqui, sob pena de não ser reconhecido/executado...
    ExemploComponent, ServersComponent, ExemploComponentComInlineTemplateComponent, ExemploComponentComInlineStylesComponent, ExemploTwoWayDatabindingComponent, Assignment2componentComponent, UsoDaDirectiveNgIfComponent
  ],
  imports: [
    BrowserModule,   ///aqui você deve especificar todos os MODULES extras que deverão ser CONSIDERADOS/incorporados ao seu module primário (app.module.ts) ----> você apenas referencia os modules que pretende usar .... ---> feature de SPLITTAR MODULES E DEIXAR MODULES MAIS 'LEAN', outsourcing de conteúdo a outros modules... --> ATÉ MESMO O ANGULAR TRABALHA COM MODULES, E VOCê TEM QUE IMPORTAR MODULES QUE VOCÊ DESEJA UTILIZAR...
      ///BrowserModule é usado para conseguir a FUNCIONALIDADE BÁSICA PARA INICIAR NOSSO APP...

      //já esses são modules extras, que você importa de acordo com o que aquer no projeto...
    FormsModule, ///precisamos disto para o 'NgModel' DIRECTIVE....
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]   ////geralmente (80% dos projetos) temos 1 único component a ser 'bootstrappado', considerado DURANTE O RUNTIME DE NOSSO APP...
})
export class AppModule { }  ///nosso component em questão.
