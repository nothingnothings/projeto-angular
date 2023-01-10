import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms'; NÃO É NECESSÁRIO.... SÓ É NECESSÁRIO NO 'template-driven approach' (TD)...
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule  ////NÃO É NECESSÁRIO.... SÓ É NECESSÁRIO NO 'template-driven approach' (TD)...
    ReactiveFormsModule ////////ESSE É O MODULE QUE VOCÊ TEM QUE IMPORTAR, PARA PODER ESCREVER FORMS USANDO O 'REACTIVE APPROACH'..
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
