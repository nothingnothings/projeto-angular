import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';

import { HeaderComponent } from './headerComponent/headerComponent.app';

// import { RecipeBookComponent } from './recipeBook/recipe-book.component'; ///OUTSOURCEADOS
// import { RecipeItemComponent } from './recipeBook/recipe-list/recipe-item/recipe-item.component';
// import { RecipeListComponent } from './recipeBook/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipeBook/recipe-detail/recipe-detail.component';
// import { SelectARecipeComponent } from './recipeBook/select-a-recipe/select-a-recipe.component';
// import { RecipeEditComponent } from './recipeBook/recipe-edit/recipe-edit.component';



// import { ShoppingListComponent } from './ShoppingList/shoppingList.component'; //////OUTSOURCEADOS
// import { ShopListEditComponent } from './ShoppingList/shop-list-edit/shop-list-edit.component';
// import { ShoppingListItemComponent } from './ShoppingList/shopping-list-item/shopping-list-item.component';


import { RecipeBookService } from './recipeBook.service';
import { ShoppingListService } from './shoppingList.service';
import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';

// import { AuthPageComponent } from './auth/auth-page.component';


// import { SpinnerComponent } from './auth-page/spinner/spinner.component';   ////OUTSOURCEADO PARA O MODULE DE `Shared`....
// import { PlaceholderDirective } from './placeholderDirective/placeholder.directive';
// import { DropdownDirective } from './dropdownDirective/dropdown.directive';

import { HttpInterceptorService } from 'src/app/httpInterceptor.service';
// import { AuthGuardService } from './auth-guard.service';
// import { AlertDynamicComponent } from './shared/alertVersaoNgIf (bem mais pratica)/alert.component';



// import { RecipeBookModule } from './recipeBook/recipe-book.module'; ///LAZILY LOADED EM 'app.routing-module.ts'...
// import { ShoppingListModule } from './ShoppingList/shoppingList.module'; ///LAZILY LOADED EM 'app.routing-module.ts'...
import { SharedModule } from './shared/shared.module';
import { LoggingService } from './logging.service';
// import { AuthModule } from './auth/auth.module';   ///LAZILY LOADED EM 'app.routing-module.ts'...
// import { AlertDynamicComponent } from './shared/alertVersaoNgIf (bem mais pratica)/alert.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // RecipeBookComponent, ////OUTSOURCEADO
    // RecipeItemComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // SelectARecipeComponent,
    // RecipeEditComponent,


    // ShoppingListComponent,  ////OUTSOURCEADO
    // ShopListEditComponent,
    // ShoppingListItemComponent,


   
    GenericErrorPageComponent,
    HomePageComponent,

    // AuthPageComponent,

     // DropdownDirective,  ///OUTSOURCEADAS PARA O MODULE DE `SHARED`...
    // SpinnerComponent,
    // AlertDynamicComponent,
    // PlaceholderDirective
    // AlertDynamicComponent
  ],
  imports: [
    // AuthModule, ///outsourcing em essa 'feature module'...  ////depois removemos esse import daqui, pq passamos a fazer LAZYLOADING desse module, com a ajuda de 'app-routing.module.ts'...

    BrowserModule,
    // ReactiveFormsModule,   ////outsourceado para o 'recipeBook', em que usei REACTIVE FORMS...
    // FormsModule, //lembre-se de adicionar isso se for usar 'ngModel()'..  //////OUTSOURCEAMOS ISSO PARA O MODULE DE 'Auth'..
    AppRoutingModule,  //módulo de routing, customizado por nós...
    HttpClientModule,
    // RecipeBookModule,  ///////OUTSOURCING, EM UM MODULE SEPARADO...  ////depois removemos esse import daqui, pq passamos a fazer LAZYLOADING desse module, com a ajuda de 'app-routing.module.ts'...
    // ShoppingListModule,  ////OUTSOURCING, EM OUTRO MODULE SEPARADO...    ////depois removemos esse import daqui, pq passamos a fazer LAZYLOADING desse module, com a ajuda de 'app-routing.module.ts'...
    SharedModule   ///outsourcing...

  ],
//   entryComponents: [   ///usado com o RENDER DE COMPONENTS DENTRO DE NOSSO CÓDIGO TS... --> ou seja, components que não vão usar um 'selector' para serem renderizados, nem o ROUTE CONFIG (paths e etc) para serem renderizados... eles vão simplesmente ser 'DROPPADOS' no código, por meio de uma directive especializada e por meio de uma 'ComponentFactory' própria...
//   AlertDynamicComponent
// ],

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
