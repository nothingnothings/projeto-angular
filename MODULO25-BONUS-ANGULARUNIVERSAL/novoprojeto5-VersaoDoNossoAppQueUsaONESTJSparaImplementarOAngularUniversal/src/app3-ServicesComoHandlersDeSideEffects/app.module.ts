import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';

import { HeaderComponent } from './headerComponent/headerComponent.app';

import { RecipeBookService } from './recipeBook.service';
import { ShoppingListService } from './shoppingList.service';
import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';


import { HttpInterceptorService } from 'src/app/httpInterceptor.service';

import { SharedModule } from './shared/shared.module';
import { LoggingService } from './logging.service';
import { StoreModule } from '@ngrx/store';
// import { shoppingListReducer } from './ShoppingList/store/shoppingList.reducer';

// import { ShoppingListReducer } from './ShoppingList/store/shoppingList.reducer';

// import { shoppingListReducer } from './ShoppingList/store/shoppingList.reducer';
import { reducers } from '.';
// import { AuthModule } from './auth/auth.module';   ///LAZILY LOADED EM 'app.routing-module.ts'...
// import { AlertDynamicComponent } from './shared/alertVersaoNgIf (bem mais pratica)/alert.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    GenericErrorPageComponent,
    HomePageComponent,

  ],
  imports: [
    // AuthModule, ///outsourcing em essa 'feature module'...  ////depois removemos esse import daqui, pq passamos a fazer LAZYLOADING desse module, com a ajuda de 'app-routing.module.ts'...
    
    
    // StoreModule.forRoot( ////é o 'CENTRAL STORE' de nosso app, implementado com NGRX...  //// aqui, precisamos dizer 'QUAIS REDUCERS VÃO SER USADOS NO NOSSO APP, QUE VÃO COMPOR NOSSA CENTRAL STORE, essencialmente'...
    //   { ///1 identifier para cada 'PARTE/REDUCER' do seu app, cada parte do state do seu app....
    //      shoppingList: shoppingListReducer       
    //   }
    // ),

    StoreModule.forRoot(
      reducers
    ),

    BrowserModule,
 
    AppRoutingModule,  //módulo de routing, customizado por nós...
    HttpClientModule,
 
    SharedModule   ///outsourcing...

  ],

  providers: [RecipeBookService, ShoppingListService, LoggingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
