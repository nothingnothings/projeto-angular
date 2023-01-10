import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { AppState } from 'src/app';
import { Recipe } from '../recipe.model';


import { withLatestFrom } from 'rxjs';  


import * as RecipeBookActions from '../store/recipeBookActions';

@Injectable()
export class RecipeBookEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState> 
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
               
                'https://recipebookdeployproject-default-rtdb.firebaseio.com/recipes.json',

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
                      ingredients: recipe.ingredients ? recipe.ingredients : [], 
                    };
                  });
 
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



  
  saveRecipes$ = createEffect(  
    () => {
      return this.actions$.pipe(
        ofType(RecipeBookActions.SAVE_RECIPES_START),
        withLatestFrom(
          this.store.select('recipeBook') 
        
          ),

       
        switchMap(([actionData, recipeBookState]) => { 
          return this.http
            .put(
        
              'https://recipebookdeployproject-default-rtdb.firebaseio.com/recipes.json', 

              
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
