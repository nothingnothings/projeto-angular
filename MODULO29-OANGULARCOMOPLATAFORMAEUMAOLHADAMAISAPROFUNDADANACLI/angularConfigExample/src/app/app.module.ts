import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PipeExemploPipe } from './pipe-exemplo.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PipeExemploPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
