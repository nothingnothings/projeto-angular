import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

export const START_FETCH_RECIPES = '[RecipeBook] START_FETCH_RECIPES';

export const FETCH_RECIPES_SUCCESS = '[RecipeBook] FETCH_RECIPES_SUCCESS';

export const FETCH_RECIPES_FAIL = '[RecipeBook] FETCH_RECIPES_FAIL';

export const SAVE_RECIPES_START = '[RecipeBook] SAVE_RECIPES_START';

export const SAVE_RECIPES_SUCCESS = '[RecipeBook] SAVE_RECIPES_SUCCESS';

export const SAVE_RECIPES_FAIL = '[RecipeBook] SAVE_RECIPES_FAIL';

export const ADD_RECIPE = '[RecipeBook] ADD_RECIPE';

export const DELETE_RECIPE = '[RecipeBook] DELETE_RECIPE';

export const EDIT_RECIPE = '[RecipeBook] EDIT_RECIPE';

export const SELECT_RECIPE = '[RecipeBook] SELECT_RECIPE';

export const GET_RECIPE = '[RecipeBook] GET_RECIPE';

// export const GET_RECIPES = '[RecipeBook] GET_RECIPES';


export const SEND_INGREDIENTS_TO_SHOP_LIST = '[RecipeBook] SEND_INGREDIENTS_TO_SHOP_LIST';

export class StartFetchRecipes implements Action {
  readonly type = START_FETCH_RECIPES;

  constructor() {}
}

export class RecipesFetchSuccess implements Action {
  readonly type = FETCH_RECIPES_SUCCESS;

  constructor(public payload: { recipes: Recipe[] }) {}
}

export class RecipesFetchFail implements Action {
  readonly type = FETCH_RECIPES_FAIL;

  constructor(public payload: string) {}
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

  constructor(public payload: number) {}
}

// export class SelectRecipe implements Action {
// readonly  type = SELECT_RECIPE;

//   constructor(public payload: { recipe: Recipe; index: number }) {}
// }





// export class SaveRecipesStart implements Action { //VERSAO RUIM, 'CLUNKY', pq precisa de um payload de 'recipes' para conseguir enviar essa data ao effect de 'saveRecipes' --> A VERSÃO BOA SIMPLESMENTE PEGA A DATA/STATE de 'recipes' DIRETAMENTE DO STATE GLOBAL DO NGRX (por meio de 'this.store.select('recipeBook))', E NÃO SE UTILIZA DE UM PAYLOAD, ACTION PURA...
//   readonly type = SAVE_RECIPES_START;

//   constructor(public payload: Recipe[]) {}
// }



export class SaveRecipesStart implements Action { ////VERSÃO _ BOA_ da action de 'saveRecipesStart'...
  readonly type = SAVE_RECIPES_START;

  constructor() {}
}




export class SaveRecipesSuccess implements Action {
  readonly type = SAVE_RECIPES_SUCCESS;

  constructor() {}
}

export class SaveRecipesFail implements Action {
  readonly type = SAVE_RECIPES_FAIL;

  constructor(public payload: string) {} ///nossa mensagem de error...
}


export class SendIngredientsToShopList implements Action {
  readonly type = SEND_INGREDIENTS_TO_SHOP_LIST;

  constructor(public payload: Ingredient[]) {} ///nossa mensagem de error...
}

export type RecipeBookActions =
  | AddRecipe
  // | SelectRecipe
  | SendIngredientsToShopList
  | DeleteRecipe
  | EditRecipe
  | StartFetchRecipes
  | RecipesFetchSuccess
  | RecipesFetchFail
  | SaveRecipesStart
  | SaveRecipesSuccess
  | SaveRecipesFail

