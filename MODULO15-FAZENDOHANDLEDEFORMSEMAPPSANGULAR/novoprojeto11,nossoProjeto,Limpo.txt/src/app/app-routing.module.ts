import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
import { RecipeBookComponent } from './recipeBook/recipe-book.component';
import { RecipeDetailComponent } from './recipeBook/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipeBook/recipe-edit/recipe-edit.component';
import { SelectARecipeComponent } from './recipeBook/select-a-recipe/select-a-recipe.component';
import { ShoppingListComponent } from './ShoppingList/shoppingList.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipe-book',
    pathMatch: 'full',
  },
  {
    path: 'recipe-book',
    component: RecipeBookComponent,
    children: [
      {
        path: '',
        component: SelectARecipeComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
      },

      {
        path: ':id/edit',
        component: RecipeEditComponent,
      },
    ],
  },

  {
    path: 'shop-list',
    component: ShoppingListComponent,
  },

  {
    path: 'not-found',
    component: GenericErrorPageComponent,
    data: {
      message: 'The requested page could not be found.',
    },
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
