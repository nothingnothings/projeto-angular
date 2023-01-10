import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { AppState } from '.';
import { Recipe } from './recipeBook/recipe.model';

import * as RecipeBookActions from '../app/recipeBook/store/recipeBookActions';

import { ofType, Actions } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.store.select('recipeBook').pipe(
      map((recipeBookState) => {
        return recipeBookState.recipes;
      }),

      switchMap((recipes: Recipe[]) => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeBookActions.StartFetchRecipes());

          return this.actions$.pipe(
            ofType(RecipeBookActions.FETCH_RECIPES_SUCCESS),

            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }

  constructor(
    private store: Store<AppState>,

    private actions$: Actions
  ) {}
}
