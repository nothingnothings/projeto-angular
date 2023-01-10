import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE = 'ADD_RECIPE';

export const DELETE_RECIPE = 'DELETE_RECIPE';

export const EDIT_RECIPE = 'EDIT_RECIPE';

export const SELECT_RECIPE = 'SELECT_RECIPE';

export class AddRecipe implements Action {
  type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class EditRecipe implements Action {
  type = EDIT_RECIPE;

  constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  type = DELETE_RECIPE;

  constructor() {}
}

export class SelectRecipe implements Action {
  type = SELECT_RECIPE;

  constructor(public payload: {recipe: Recipe, index: number}) {}
}

export type RecipeBookActions =
  | AddRecipe
  | SelectRecipe
  | DeleteRecipe
  | EditRecipe;
