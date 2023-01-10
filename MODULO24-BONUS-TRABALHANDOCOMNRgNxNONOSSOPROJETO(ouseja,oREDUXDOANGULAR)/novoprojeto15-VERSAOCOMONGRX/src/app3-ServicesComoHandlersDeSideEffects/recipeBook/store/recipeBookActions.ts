import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const START_FETCH_RECIPES = '[RecipeBook] START_FETCH_RECIPES';

export const FETCH_RECIPES = '[RecipeBook] FETCH_RECIPES';

export const END_FETCH_RECIPES = '[RecipeBook] END_FETCH_RECIPES';

export const ADD_RECIPE = '[RecipeBook] ADD_RECIPE';

export const DELETE_RECIPE = '[RecipeBook] DELETE_RECIPE';

export const EDIT_RECIPE = '[RecipeBook] EDIT_RECIPE';

export const SELECT_RECIPE = '[RecipeBook] SELECT_RECIPE';

export class StartFetchRecipes implements Action {
  readonly type = START_FETCH_RECIPES;

  constructor() {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;

  constructor() {}
}

export class EndFetchRecipes implements Action {
  readonly type = END_FETCH_RECIPES;

  constructor() {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class EditRecipe implements Action {
 readonly type = EDIT_RECIPE;

  constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor() {}
}

export class SelectRecipe implements Action {
readonly  type = SELECT_RECIPE;

  constructor(public payload: { recipe: Recipe; index: number }) {}
}

export type RecipeBookActions =
  | AddRecipe
  | SelectRecipe
  | DeleteRecipe
  | EditRecipe
  | StartFetchRecipes
  | FetchRecipes
  | EndFetchRecipes
