import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServerCockpitComponent } from './server-cockpit/server-cockpit.component';
import { ServerItemComponent } from './server-item/server-item.component';

@NgModule({
  declarations: [AppComponent, ServerCockpitComponent, ServerItemComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
