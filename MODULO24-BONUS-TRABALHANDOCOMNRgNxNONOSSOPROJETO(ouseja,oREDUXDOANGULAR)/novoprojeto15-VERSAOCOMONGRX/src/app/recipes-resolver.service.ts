import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { map, Observable, of, switchMap, take } from "rxjs";
import { AppState } from ".";
import { RecipeBookService } from "./recipeBook.service";
import { Recipe } from "./recipeBook/recipe.model";

import * as RecipeBookActions from '../app/recipeBook/store/recipeBookActions';



import { ofType, Actions } from "@ngrx/effects";  ///FEATURES TÍPICAS DO NGRX/EFFECTS, MAS QUE PODEM SER UTILIZADAS EM OUTRAS CLASSES, SEM PROBLEMAS...



@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        



        //      ////CÓDIGO SEM O NGRX E NGRX/EFFECTS:

        // const recipes = this.recipeBookService.getRecipes();

        // // console.log('TEST');
        // ///aqui fazemos o RETURN DE UM OBSERVABLE, que vai essencialmente sofrer 'subscribe' automaticamente pelo angular por estar posicionado em 1 resolver....
        
        
        // if (recipes.length === 0) {
        //     // console.log('LINE')

        //     ////CÓDIGO SEM O NGRX E NGRX/EFFECTS:
        //     return this.recipeBookService.loadRecipes();  // vai 'resolve' essa data ANTES DE NOSSOS COMPONENTS SEREM CARREGADOS, ANTES DA PAGE DE 'recipe-book' SER CARREGADA...
        

        //     // return this.store.dispatch(new RecipeBookActions.StartFetchRecipes());


        // } else {
        //     // console.log('LINE2')
        //     // console.log(recipes);
        //     return recipes
        // }
        













        
             ////CÓDIGO COM O NGRX E NGRX/EFFECTS..




            // return this.store.dispatch(new RecipeBookActions.StartFetchRecipes());  ////ISSO _ NÃO FUNCIONA, você tem que fazer essa gambiarra  vista logo abaixo...


                // NÃO PODEMOS SIMPLESMENTE __ RETORNAR __ O DISPATCH DESSA ACTION AQUI,
                // PQ ISSO __ NÃO VAI 'YIELD' 
                // UM OBSERVABLE...
            
                // ___ EM VEZ DISSO,
                // O QUE VAMOS QUERER FAZER É 
                
            
                // ''''''''ESPERAR __ PELO __ EFFECT__ QUE É __TRIGGADO__ POR __ ESSA ACTION,
                
                // ESPERAR O COMPLETE DO EFFECT QUE É TRIGGADO POR ESSA ACTION''''


                ///PARA __ rESOLVEr__ ESSE PROBLEMA, vamos usar A LÓGICA DE FILTERING dos effects E O 'actions$' observable, também típico de 'effects', MAS QUE NÃO SÃO EXCLUSIVOS A CLASSES 'effects' ( podem ser usados em QUALQUER CLASS DE NOSSO APP, não só em classes de tipo 'effect') 

                ////TIPO ASSIM:



                // this.store.dispatch(new RecipeBookActions.StartFetchRecipes());


                // return this.actions$.pipe(
                //     ofType(
                //       RecipeBookActions.FETCH_RECIPES_SUCCESS
                //     ),

                //     take(1)  ////vamos querer apenas o PRIMEIRO 'state' que esse negócio vai nos retornar, descartados os outros states subsequentes...

                // )







                ///uso de 'switchMap' para fundir o OBSERVABLE DE 'state' (store) com o observable de 'FETCH RECIPES'... (assim evitamos conflitso entre 'local state' e o STATE LÁ DO BACKEND, quando editamos recipes)....




               return this.store.select('recipeBook').pipe(
                    
                    map(
                        (recipeBookState) => {

                            return recipeBookState.recipes;
                        }
                    ),


                    switchMap(
                        (recipes: Recipe[]) => {


                            if (recipes.length === 0) { ///se não tivermos NENHUM RECIPE ITEM NO STATE DE RECIPES 'LOCAL' antigo, vamos querer FETCHEAR ESSAS RECIPES LÁ DO BACKEDN...
                                this.store.dispatch(new RecipeBookActions.StartFetchRecipes());


                                return this.actions$.pipe(
                                    ofType(
                                      RecipeBookActions.FETCH_RECIPES_SUCCESS
                                    ),
                
                                    take(1)  ////vamos querer apenas o PRIMEIRO 'state' que esse negócio vai nos retornar, descartados os outros states subsequentes...
                
                                )
                            } else {

                                return of(recipes);  ////CASO JÁ TENHAMOS ALGUM 'RECIPE ITEM' NO NOSSO STATE VELHO, vamos querer MANTÊ-LO, E NÃO FAZER 'RETRIEVE/FETCH' dos recipes lá no backend...

                            }
                        }
                    )
                )


                
           




    }

    constructor(
        
        // private recipeBookService: RecipeBookService,
        
        
        private store: Store<AppState>, 
        
        private actions$: Actions) {

    }

}







// "ngrx/store" shouldn't be necessarily used in a "resolve" function.
// however, inside the "resolve" function, you can use "take(1)" from the "store" to retrieve a snapshot of the store, but you'll have to return some kind of a promise.