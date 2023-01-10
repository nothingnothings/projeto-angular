import { Recipe } from '../recipe.model';

import { updateObject } from 'src/app/utility/updateObject';

// import * as RecipeBookActions from './recipeBookActions';

import * as fromRecipeBook from './recipeBookActions';

export interface RecipeBookState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  selectedRecipeIndex: number;
}

const initialState: RecipeBookState = {
  recipes: [],
  selectedRecipe: null,
  selectedRecipeIndex: -1,
};

export function recipeBookReducer(
  state: RecipeBookState = initialState,
  action: fromRecipeBook.RecipeBookActions
) {
  switch (action.type) {
    case fromRecipeBook.ADD_RECIPE:
      return addRecipe(state, action as fromRecipeBook.AddRecipe);
    case fromRecipeBook.EDIT_RECIPE:
      return editRecipe(state, action as fromRecipeBook.EditRecipe);
    case fromRecipeBook.SELECT_RECIPE:
      return selectRecipe(state, action as fromRecipeBook.SelectRecipe);
    case fromRecipeBook.DELETE_RECIPE:
      return deleteRecipe(state, action as fromRecipeBook.DeleteRecipe);
    default:
      return state;
  }
}

const addRecipe = (
  state: RecipeBookState,
  action: fromRecipeBook.AddRecipe
) => {
  const updatedRecipes = [...state.recipes];

  updatedRecipes.push(action.payload);

  return updateObject(state, { recipes: updatedRecipes });
};

const editRecipe = (
  state: RecipeBookState,
  action: fromRecipeBook.EditRecipe
) => {
  const updatedRecipes = [...state.recipes];

  updatedRecipes[state.selectedRecipeIndex] = action.payload;

  return updateObject(state, {
    recipes: updatedRecipes,
    selectedRecipeIndex: -1,
    selectedRecipe: null,
  });
};

const selectRecipe = (
  state: RecipeBookState,
  action: fromRecipeBook.SelectRecipe
) => {
  return updateObject(state, {
    selectedRecipeIndex: action.payload.index,
    selectedRecipe: action.payload.recipe,
  });
};

const deleteRecipe = (
  state: RecipeBookState,
  action: fromRecipeBook.DeleteRecipe
) => {
  const updatedRecipes = [...state.recipes];

  updatedRecipes.splice(state.selectedRecipeIndex, 1);

  return updateObject(state, {
    recipes: updatedRecipes,
    selectedRecipeIndex: -1,
    selectedRecipe: null,
  });
};
