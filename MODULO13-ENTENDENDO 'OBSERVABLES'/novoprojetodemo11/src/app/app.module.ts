import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ActivateService } from './activate.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, UserComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [ActivateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
