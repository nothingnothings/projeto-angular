import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';

import { HeaderComponent } from './headerComponent/headerComponent.app';

import { RecipeBookComponent } from './recipeBook/recipe-book.component';
import { RecipeItemComponent } from './recipeBook/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipeBook/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipeBook/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './ShoppingList/shoppingList.component';
import { ShopListEditComponent } from './ShoppingList/shop-list-edit/shop-list-edit.component';
import { ShoppingListItemComponent } from './ShoppingList/shopping-list-item/shopping-list-item.component';

import { DropdownDirective } from './dropdownDirective/dropdown.directive';
import { RecipeBookService } from './recipeBook.service';
import { ShoppingListService } from './shoppingList.service';
import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SelectARecipeComponent } from './recipeBook/select-a-recipe/select-a-recipe.component';
import { RecipeEditComponent } from './recipeBook/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeBookComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShopListEditComponent,
    ShoppingListItemComponent,
    DropdownDirective,
    GenericErrorPageComponent,
    HomePageComponent,
    SelectARecipeComponent,
    RecipeEditComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule, //lembre-se de adicionar isso se for usar 'ngModel()'..
    AppRoutingModule,  //módulo de routing, customizado por nós...
    HttpClientModule
  ],
  providers: [RecipeBookService, ShoppingListService,
    
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
