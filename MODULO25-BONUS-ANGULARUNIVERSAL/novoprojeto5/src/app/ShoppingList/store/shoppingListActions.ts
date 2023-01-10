import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const GET_INGREDIENT = '[Shopping List] INGREDIENT_GET';

export const ADD_INGREDIENT = '[Shopping List] INGREDIENT_ADD';

export const ADD_INGREDIENTS = '[Shopping List] INGREDIENTS_ADD';

export const EDIT_INGREDIENT = '[Shopping List] INGREDIENT_EDIT';

export const DELETE_INGREDIENT = '[Shopping List] INGREDIENT_DELETE';

export const START_EDIT = '[Shopping List] START_EDIT';

export const STOP_EDIT = '[Shopping List] STOP_EDIT';

export class AddIngredient implements Action {
  readonly type: string = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type: string = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class RemoveIngredient implements Action {
  readonly type: string = DELETE_INGREDIENT;

  constructor() {}
}

export class EditIngredient implements Action {
  readonly type: string = EDIT_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class StartEdit implements Action {
  readonly type: string = START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type: string = STOP_EDIT;
}

export type ShoppingListActionTypes =
  | AddIngredient
  | AddIngredients
  | EditIngredient
  | RemoveIngredient
  | StartEdit
  | StopEdit;
