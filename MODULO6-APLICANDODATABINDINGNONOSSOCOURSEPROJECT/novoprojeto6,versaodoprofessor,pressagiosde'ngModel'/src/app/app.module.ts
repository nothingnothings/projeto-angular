import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HeaderComponent } from './headerComponent/headerComponent.app';

import { RecipeBookComponent } from './recipeBook/recipe-book.component';
import { RecipeItemComponent } from './recipeBook/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipeBook/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipeBook/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './ShoppingList/shoppingList.component';
import { ShopListEditComponent } from './ShoppingList/shop-list-edit/shop-list-edit.component';
import { ShoppingListItemComponent } from './ShoppingList/shopping-list-item/shopping-list-item.component';
import { FormsModule } from '@angular/forms';

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
    ShoppingListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule //lembre-se de adicionar isso se for usar 'ngModel()'..
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
