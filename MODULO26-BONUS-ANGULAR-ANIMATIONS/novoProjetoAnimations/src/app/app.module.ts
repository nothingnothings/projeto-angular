import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; ///É ASSIM QUE CONSEGUIMOS IMPORTAR ESSE MODULE, que é indispensável...

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
