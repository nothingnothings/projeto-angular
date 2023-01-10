import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
// import { AuthGuardService } from './auth/auth-guard.service';
// import { AuthPageComponent } from './auth/auth-page.component';
// import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
// import { HomePageComponent } from './home-page/home-page.component';
// import { HomePageComponent } from './home-page/home-page.component';
// import { RecipeBookComponent } from './recipeBook/recipe-book.component';
// import { RecipeDetailComponent } from './recipeBook/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipeBook/recipe-edit/recipe-edit.component';
// import { SelectARecipeComponent } from './recipeBook/select-a-recipe/select-a-recipe.component';
// import { RecipesResolverService } from './recipes-resolver.service';
// import { RecipesResolverService } from './recipes-resolver.service';
// import { ShoppingListComponent } from './ShoppingList/shoppingList.component';
// import { ShoppingListModule } from './ShoppingList/shoppingList.module';

const appRoutes: Routes = [
  // {   ///approach que USA UMA HOME PAGE COMO ROUTE DE '/'...
  //   path: '',
  //   component: HomePageComponent,
  // },

  // {////ordem das routes importa, exatamente como no REACT ROUTER
    
  //   path: '',
  //   redirectTo: '/recipe-book',
  //   pathMatch: 'full', /// (COMMON GOTCHA) evita o error de 'SEMPRE VAI REDIRECIONAR PARA ESSA ROUTE DE recipe-book' (pq o padrão é 'prefix' em vez de 'full'; ou seja, é o MESMO COMPORTAMENTO DEFAULT DO REACT ROUTER)...
  // },

    // {////ordem das routes importa, exatamente como no REACT ROUTER
    
    //   path: '',
    //   redirectTo: '/recipe-book',
    //   pathMatch: 'full', /// (COMMON GOTCHA) evita o error de 'SEMPRE VAI REDIRECIONAR PARA ESSA ROUTE DE recipe-book' (pq o padrão é 'prefix' em vez de 'full'; ou seja, é o MESMO COMPORTAMENTO DEFAULT DO REACT ROUTER)...
    // },

    // {
    //   path: '', ////approach SEM LAZY LOADING.
    //   component: RecipeBookComponent
    // },


    {
      path: '',
      redirectTo: '/recipe-book',
      pathMatch: 'full'
    },

    
    {path: 'recipe-book', 
              ////vocÊ deve escrever o PATH ATÉ O SEU ARQUIVO, e logo depois o '#NOME DA CLASS/MODULE DENTRO DESSE ARQUIVO' (é necessário especificar assim, para que isso funcione)...
    //  loadChildren: './recipeBook/recipe-book.module.ts#RecipeBookModule'       ////lazy loading   --> é o 'module' que você vai carregar de forma LAZY. (só quando o user acessar essa sua route, essencialmente)...
        ////SINTAXE VELHA DE 'loadChildren' ^^^


        ///SINTAXE NOVA VVVVVV 

        loadChildren: () => import('./recipeBook/recipe-book.module').then(x => x.RecipeBookModule)
  
  
  },



     
  {path: 'shop-list', 

loadChildren: () => import('./ShoppingList/shoppingList.module').then(x => x.ShoppingListModule)


} ,


    
{path: 'auth', 

loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)


}







  // { ////route OUTSOURCEADA...
  //   path: 'recipe-book',
  //   component: RecipeBookComponent,
  //   canActivate: [AuthGuardService], ////VAI REDIRECIONAR à 'auth', SE O USER NÃO ESTIVER AUTH....
  //   children: [
  //     {
  //       path: '',
  //       resolve: [RecipesResolverService],
  //       component: SelectARecipeComponent,
  //     },
  //     {
  //       path: 'new',

  //       component: RecipeEditComponent,
  //     },
  //     {
  //       path: ':id',
  //       resolve: [RecipesResolverService],
  //       component: RecipeDetailComponent,
  //     },

  //     {
  //       path: ':id/edit',
  //       resolve: [RecipesResolverService],
  //       component: RecipeEditComponent,
  //     },

  //     // {
  //     //     path: 'new-recipe',
  //     // }
  //   ],
  // },



  // { ///ROUTE OUTSOURCEADA
  //   path: 'shop-list',
  //   component: ShoppingListComponent,
  // },

  // {

  //   path: 'auth',
  //   canActivate: [AuthGuardService], ////VAI REDIRECIONAR à '/recipe-book', SE O USER JÁ ESTIVER AUTHENTICATED...
  //   component: AuthPageComponent
  // },

  // {
  //   path: 'not-found',
  //   component: GenericErrorPageComponent,
  //   data: {
  //     message: 'The requested page could not be found.',
  //   },
  // },
  // {
  //   path: '**',
  //   redirectTo: '/not-found',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    // preloadingStrategy: NoPreload  //// esse é o DEFAULT (não faz o preload de nada; sem optimização para o LAZY LOADING)
    preloadingStrategy: PreloadAllModules /////ESSA É A OPTION USADA PARA 'OPTIMIZAR O LAZY LOADING', pq teremos um pre-load para cada route, essencialmente...
    ////com isso, ganhamos o MELHOR DOS 2 MUNDOS: LAZY-LOADING e 'pre-load' de routes que não estamos visitando..
    ,
    initialNavigation: 'enabledBlocking'
})],

  exports: [RouterModule],
})
export class AppRoutingModule {}
