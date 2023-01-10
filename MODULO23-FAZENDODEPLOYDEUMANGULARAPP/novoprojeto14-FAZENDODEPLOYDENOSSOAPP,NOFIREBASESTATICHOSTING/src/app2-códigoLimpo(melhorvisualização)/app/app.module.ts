import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HeaderComponent } from './headerComponent/headerComponent.app';

import { RecipeBookService } from './recipeBook.service';
import { ShoppingListService } from './shoppingList.service';
import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';

import { AuthPageComponent } from './auth-page/auth-page.component';

import { HttpInterceptorService } from 'src/app/httpInterceptor.service';

import { RecipeBookModule } from './recipeBook/recipe-book.module';
import { ShoppingListModule } from './ShoppingList/shoppingList.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    GenericErrorPageComponent,
    HomePageComponent,

    AuthPageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipeBookModule,
    ShoppingListModule,
    SharedModule,
  ],

  providers: [
    RecipeBookService,
    ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
