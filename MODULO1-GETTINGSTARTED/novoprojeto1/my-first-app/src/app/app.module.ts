import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms'; ////precisamos importar features, no typescript, para que funcionem com o angular... 

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule ///especifique aqui os modules que vocÊ quer utilizar...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
