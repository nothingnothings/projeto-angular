import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeBookRoutingModule } from './recipe-book-routing.module';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { SelectARecipeComponent } from './select-a-recipe/select-a-recipe.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeDetailComponent,
    RecipeBookComponent,
    SelectARecipeComponent,
    RecipeEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
  ],
  providers: [],
  imports: [SharedModule, ReactiveFormsModule, RecipeBookRoutingModule],
  exports: [],
})
export class RecipeBookModule {}
