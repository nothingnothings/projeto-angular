import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExemploComponent } from './exemplo/exemplo.component';
import { Exemplo2Component } from './exemplo2/exemplo2.component';


@NgModule({
  declarations: [
    AppComponent,
    ExemploComponent,
    Exemplo2Component,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
