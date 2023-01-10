import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HeaderComponent } from './headerComponent/headerComponent.app';

import { RecipeBookService } from './recipeBook.service';
import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';

import { HttpInterceptorService } from 'src/app/httpInterceptor.service';

import { SharedModule } from './shared/shared.module';
import { LoggingService } from './logging.service';
import { StoreModule } from '@ngrx/store';

import { shoppingListReducer } from './ShoppingList/store/shoppingList.reducer';
import { reducers } from '.';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    GenericErrorPageComponent,
    HomePageComponent,
  ],
  imports: [
    StoreModule.forRoot(reducers),

    BrowserModule,

    AppRoutingModule,
    HttpClientModule,

    SharedModule,
  ],

  providers: [
    RecipeBookService,
    LoggingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
