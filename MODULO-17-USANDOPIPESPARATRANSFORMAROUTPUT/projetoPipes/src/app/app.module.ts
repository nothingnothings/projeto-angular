import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShortenPipe } from './shorten.pipe';
import { ShortenSpecificPipe } from './shortenSpecific.pipe';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  
    ShortenPipe, /////É AQUI QUE OS PIPES SÃO ADICIONADOS (pipes são adicionados como COMPONENTS E DIRECTIVES)..
    ShortenSpecificPipe,
    
    FilterPipe ////mostra um pouco do uso e limitações de pipes...
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
