import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipesResolverService } from '../recipes-resolver.service';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { SelectARecipeComponent } from './select-a-recipe/select-a-recipe.component';

const recipeBookRoutes: Routes = [
  {
    path: '',
    component: RecipeBookComponent,
    canActivate: [AuthGuardService],
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
        resolve: [RecipesResolverService],
        component: RecipeDetailComponent,
      },

      {
        path: ':id/edit',
        resolve: [RecipesResolverService],
        component: RecipeEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipeBookRoutes)],

  exports: [RouterModule],
})
export class RecipeBookRoutingModule {}
