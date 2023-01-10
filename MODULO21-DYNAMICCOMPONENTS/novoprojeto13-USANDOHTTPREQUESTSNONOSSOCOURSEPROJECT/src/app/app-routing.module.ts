import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
// import { HomePageComponent } from './home-page/home-page.component';
import { RecipeBookComponent } from './recipeBook/recipe-book.component';
import { RecipeDetailComponent } from './recipeBook/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipeBook/recipe-edit/recipe-edit.component';
import { SelectARecipeComponent } from './recipeBook/select-a-recipe/select-a-recipe.component';
import { RecipesResolverService } from './recipes-resolver.service';
// import { RecipesResolverService } from './recipes-resolver.service';
import { ShoppingListComponent } from './ShoppingList/shoppingList.component';

const appRoutes: Routes = [
  // {   ///approach que USA UMA HOME PAGE COMO ROUTE DE '/'...
  //   path: '',
  //   component: HomePageComponent,
  // },

  {////ordem das routes importa, exatamente como no REACT ROUTER
    
    path: '',
    redirectTo: '/recipe-book',
    pathMatch: 'full', /// (COMMON GOTCHA) evita o error de 'SEMPRE VAI REDIRECIONAR PARA ESSA ROUTE DE recipe-book' (pq o padrão é 'prefix' em vez de 'full'; ou seja, é o MESMO COMPORTAMENTO DEFAULT DO REACT ROUTER)...
  },
  {
    path: 'recipe-book',
    component: RecipeBookComponent,
    canActivate: [AuthGuardService], ////VAI REDIRECIONAR à 'auth', SE O USER NÃO ESTIVER AUTH....
    children: [
      {
        path: '',
        resolve: [RecipesResolverService],
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

      // {
      //     path: 'new-recipe',
      // }
    ],
  },

  {
    path: 'shop-list',
    component: ShoppingListComponent,
  },


  {

    path: 'auth',
    canActivate: [AuthGuardService], ////VAI REDIRECIONAR à '/recipe-book', SE O USER JÁ ESTIVER AUTHENTICATED...
    component: AuthPageComponent
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
