import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { AppState } from 'src/app';
import { Recipe } from '../recipe.model';


import { withLatestFrom } from 'rxjs';  ////////OPERATOR ESPECIAL. --> 'PEGA A DATA DE UMA OBSERVABLE STREAM, LATEST DATA DELA, PARA _ AÍ _ MERGEAR_ ESSA DATA DA OBSERVABLE STREAM __ COM UMA _ NOVA OBSERVABLE STREAM)...


import * as RecipeBookActions from '../store/recipeBookActions';

@Injectable()
export class RecipeBookEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState> /////a STORE _ é necessária para podermos utilizar 'withLatestFrom()' (operator especial, usado em 'save Recipes')...
  ) {}

  fetchRecipes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RecipeBookActions.START_FETCH_RECIPES),

        switchMap(
          (startFetchRecipeAction: RecipeBookActions.StartFetchRecipes) => {
            const requestHeaders = new HttpHeaders();

            return this.http
              .get<{ [name: string]: Recipe }>(
                // 'https://recipebookdummyproject-default-rtdb.firebaseio.com/recipes.json' ///VERSÃO DUMMY, SEM AUTHENTICATE RULES NO FIREBASE API
                'https://recipebookdeployproject-default-rtdb.firebaseio.com/recipes.json', //VERSÃO DEPLOY, com o uso de AUTHENTICATE RULES no firebase api (restrição de acesso a contas com email)...

                {
                  headers: requestHeaders,
                }
              )
              .pipe(
                map((data) => {
                  const transformedRecipesArray: Recipe[] = [];

                  for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                      transformedRecipesArray.push({ ...data[key] });
                    }
                  }

                  transformedRecipesArray.map((recipe) => {
                    return {
                      ...recipe,
                      ingredients: recipe.ingredients ? recipe.ingredients : [], ////////SE NOSSA PROPRIEDADE 'ingredients' dessa recipe específica NÃO EXISTIR (um bug possível), VAMOS QUERER QUE OS INGREDIENTS SEJAM SETTADOS COMO UM EMPTY ARRAY....
                    };
                  });
                  // return transformedRecipesArray;
                  // console.log('recipes', transformedRecipesArray);

                  return new RecipeBookActions.RecipesFetchSuccess({
                    recipes: transformedRecipesArray,
                  });
                }),

                catchError((errorRes: any) => {
                  let errorMessage = 'An unknown error has occured.';

                  if (!errorRes.error || !errorRes.error.error) {
                    return of(
                      new RecipeBookActions.RecipesFetchFail(errorMessage)
                    );
                  }

                  // switch (errorRes.error.error.message) {  ///ainda não sei quais errors são possíveis, na realtime database api do firebase...
                  //   case 'EMAIL_NOT_FOUND':
                  //     errorMessage = 'No user found for the entered email!';
                  //     break;
                  //   case 'INVALID_PASSWORD':
                  //     errorMessage = 'Invalid password, please try again.';
                  //     break;
                  //   case 'EMAIL_ALREADY_EXISTS':
                  //     errorMessage = 'Email already exists, please try again.';
                  // }

                  return of(
                    new RecipeBookActions.RecipesFetchFail(errorMessage)
                  );
                })
              );
          }
        )
      );
    },
    { dispatch: true }
  );

  // saveRecipes$ = createEffect( ///MINHA VERSÃO, RUIM, QUE _ USA _ UM PAYLOAD DE 'RECIPES' NA ACTION DE 'START_RECIPES_SAVE'..
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(RecipeBookActions.SAVE_RECIPES_START),

  //       switchMap((savedRecipeData: RecipeBookActions.SaveRecipesStart) => {
  //         return this.http
  //           .put(
  //             //////a url de cima é a versão DE DUMMY DO NOSSO PROJETO, SEM AUTHENTICATION RULES NO FIREBASE API..
  //             // 'https://recipebookdummyproject-default-rtdb.firebaseio.com/recipes.json', ////será um request de PUT, e não de 'POST'... --> ISSO PQ QUEREMOS SEMPRE OVERWRITTAR O VALUE ANTIGO DE 'recipes' com o nosso NOVO value...
  //             'https://recipebookdeployproject-default-rtdb.firebaseio.com/recipes.json', //VERSÃO DEPLOY, com o uso de AUTHENTICATE RULES no firebase api (restrição de acesso a contas com email)...
  //             savedRecipeData.payload
  //           )
  //           .pipe(
  //             map((data) => {
  //               return new RecipeBookActions.SaveRecipesSuccess();
  //             }),

  //             catchError((errorRes: any) => {
  //               let errorMessage = 'An unknown error has occured.';

  //               if (!errorRes.error || !errorRes.error.error) {
  //                 return of(
  //                   new RecipeBookActions.SaveRecipesFail(errorMessage)
  //                 );
  //               }

  //               return of(new RecipeBookActions.SaveRecipesFail(errorMessage));
  //             })
  //           );
  //       })
  //     );
  //   },
  //   { dispatch: true }
  // );





  
  saveRecipes$ = createEffect(  ///////VERSÃO DO PROFESSOR, MELHOR, que USA O OPERATOR DE 'withLatestFrom()' PARA PEGAR AS LATEST RECIPES NO NOSSO STATE, para aí as utilizar para FAZER ESSE SAVE DELAS NO BACKEND... (deixa de se valer de um PAYLOAD na action de 'AUTH_sAVE_sTART')...
    () => {
      return this.actions$.pipe(
        ofType(RecipeBookActions.SAVE_RECIPES_START),
        withLatestFrom(
          this.store.select('recipeBook') ///QUEREMOS RETORNAR A 'LATEST DATA' desse slice, para ser usado naquele METHOD QUE VAI FAZER 'SAVE' das recipes no nosso backend...
        
        
          ),

          ///o que acaba dentro desse 'switchMap', se existirem múltiplas coisas antes dele, será um ARRAY com OS 'OBSERVABLES' em __ ORDEM...
        switchMap(([actionData, recipeBookState]) => { //////O RXJS (method de 'withLatestFrom') VAI _NOS DAR ESSE ARRAY AÍ, que terá TANTO A DATA DE 'ofType' (que é 'actionData', que contém a DATA QUE EXISTIA NA ACTION) como TAMBÉM O 'recipeState', que TERÁ SIDO RETRIEVADO POR 'withLatestFrom()', e que é a coisa QUE REALMENTE NOS INTERESSA, NESSE METHOD DE 'storeREcipes'...
          return this.http
            .put(
              //////a url de cima é a versão DE DUMMY DO NOSSO PROJETO, SEM AUTHENTICATION RULES NO FIREBASE API..
              // 'https://recipebookdummyproject-default-rtdb.firebaseio.com/recipes.json', ////será um request de PUT, e não de 'POST'... --> ISSO PQ QUEREMOS SEMPRE OVERWRITTAR O VALUE ANTIGO DE 'recipes' com o nosso NOVO value...
              'https://recipebookdeployproject-default-rtdb.firebaseio.com/recipes.json', //VERSÃO DEPLOY, com o uso de AUTHENTICATE RULES no firebase api (restrição de acesso a contas com email)...
              // savedRecipeData.payload

              
              recipeBookState.recipes
            )
            .pipe(
              map((data) => {
                return new RecipeBookActions.SaveRecipesSuccess();
              }),

              catchError((errorRes: any) => {
                let errorMessage = 'An unknown error has occured.';

                if (!errorRes.error || !errorRes.error.error) {
                  return of(
                    new RecipeBookActions.SaveRecipesFail(errorMessage)
                  );
                }

                return of(new RecipeBookActions.SaveRecipesFail(errorMessage));
              })
            );
        })
      );
    },
    { dispatch: true }
  );

}
