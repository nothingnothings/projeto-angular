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

import { StoreDevtoolsModule } from '@ngrx/store-devtools';  ////instale com 'npm install --save-dev store-devtools'






import { StoreRouterConnectingModule } from '@ngrx/router-store'; //package do 'ROUTER-STORE'... -> vai te deixar RODAR CÓDIGO, LÁ NOS EFFECTS/REDUCER, a partir DE ROUTING ACTIONS ACONTECENDO NO NOSSO APP (se tivermos uma ROUTING ACTION, pode ser que alguma function/código dentro dos reducers/effects seja executado).... 
// import { shoppingListReducer } from './ShoppingList/store/shoppingList.reducer';

// import { ShoppingListReducer } from './ShoppingList/store/shoppingList.reducer';

// import { shoppingListReducer } from './ShoppingList/store/shoppingList.reducer';
import { reducers } from '.';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment'; ///um dos EFFECTS de nosso código...
import { RecipeBookEffects } from './recipeBook/store/recipeBook.effects';

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
    StoreDevtoolsModule.instrument({logOnly: environment.production}), ////USADO COM A EXTENSÃO 'REDUX DEV TOOLS' do chrome/firefox... --> E SEMPRE ADICIONE ESSA 'FEATURE' DEPOIS  DO SET DO REDUCER (código de ''StoreModule.forRoot(reducers)' ), PQ CASO CONTRÁRIO ISSO _NÃO FUNCIONARÁ...
    EffectsModule.forRoot([AuthEffects, RecipeBookEffects]), //essencial para o run de código async com nossos reducers (Suportando nossos reducers com código async)...
                    ///nesse 'forRoot()" do EffectsModule vocÊ deve passar um ARRAY DE SEUS 'ROOT' EFFECTS /effect classes...
    BrowserModule,
 
    AppRoutingModule,  //módulo de routing, customizado por nós...
    HttpClientModule,
 
    SharedModule,
 
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),   ///outsourcing...

    StoreRouterConnectingModule.forRoot()  //o 'forRoot' fica em branco mesmo.. --> e 'StoreRouterConnectingMOdule' PRECISA SER ESCRITO/IMPLEMENTADO 1) DEPOIS DO SET DO SEU STORE; 2) DEPOIS DO SET DAS 'REDUX DEVTOOLS' por meio de 'StoreDevToolsModule'...  
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
