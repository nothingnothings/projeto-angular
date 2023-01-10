

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth-guard.service";
import { RecipesResolverService } from "../recipes-resolver.service";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { SelectARecipeComponent } from "./select-a-recipe/select-a-recipe.component";






const recipeBookRoutes: Routes = [
    // {
    //     path: 'recipe-book',    ////SEM LAZY LOADING
    //     component: RecipeBookComponent,
    //     canActivate: [AuthGuardService], ////VAI REDIRECIONAR à 'auth', SE O USER NÃO ESTIVER AUTH....
    //     children: [
    //       {
    //         path: '',
    //         resolve: [RecipesResolverService],
    //         component: SelectARecipeComponent,
    //       },
    //       {
    //         path: 'new',
    //         component: RecipeEditComponent,
    //       },
    //       {
    //         path: ':id',
    //         resolve: [RecipesResolverService],
    //         component: RecipeDetailComponent,
    //       },
    
    //       {
    //         path: ':id/edit',
    //         resolve: [RecipesResolverService],
    //         component: RecipeEditComponent,
    //       },
    
    //     ],
    //   },



    {
      path: '',   ////COM LAZY LOADING
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
  
      ],
    },
]




@NgModule(
    {
        imports: [
            // RouterModule.forChild(recipeBookRoutes)   ////quando você quer incluir algum 'FEATURE MODULE' dentro de seu APP MODULE (outsourcing), você usa esse 'forChild' em vez de 'forRoot()'...
            RouterModule.forChild(recipeBookRoutes) 
          ],

        exports: [
            RouterModule
        ]
    }
)
export class RecipeBookRoutingModule {

}