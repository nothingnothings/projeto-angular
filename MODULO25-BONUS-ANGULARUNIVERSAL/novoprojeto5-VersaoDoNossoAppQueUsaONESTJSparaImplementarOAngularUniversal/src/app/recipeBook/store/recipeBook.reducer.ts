import { Recipe } from '../recipe.model';

import { updateObject } from 'src/app/utility/updateObject';

// import * as RecipeBookActions from './recipeBookActions';

import * as fromRecipeBook from './recipeBookActions';

export interface RecipeBookState {
  recipes: Recipe[];
  // selectedRecipe: Recipe | null;
  // selectedRecipeIndex: number;
  isLoading: boolean;
  error: string | null;
}

// export interface AppState {
//   recipeBook: RecipeBookState;
// }

const initialState: RecipeBookState = {
  recipes: [],
  // selectedRecipe: null,
  // selectedRecipeIndex: -1,
  isLoading: false,
  error: null,
};

export function recipeBookReducer(
  state: RecipeBookState = initialState,
  action: fromRecipeBook.RecipeBookActions
) {
  switch (action.type) {
    case fromRecipeBook.START_FETCH_RECIPES:
      return startFetchRecipes(
        state,
        action as fromRecipeBook.StartFetchRecipes
      );
    case fromRecipeBook.FETCH_RECIPES_SUCCESS:
      return recipesFetchSuccess(
        state,
        action as fromRecipeBook.RecipesFetchSuccess
      );
    case fromRecipeBook.FETCH_RECIPES_FAIL:
      return recipesFetchFail(state, action as fromRecipeBook.RecipesFetchFail);
      case fromRecipeBook.SAVE_RECIPES_START:
        return saveRecipesStart(state, action as fromRecipeBook.SaveRecipesStart);
      case fromRecipeBook.SAVE_RECIPES_FAIL:
        return saveRecipesFail(state, action as fromRecipeBook.SaveRecipesFail);
      case fromRecipeBook.SAVE_RECIPES_SUCCESS:
        return saveRecipesSuccess(state, action as fromRecipeBook.SaveRecipesSuccess)
    case fromRecipeBook.ADD_RECIPE:
      return addRecipe(state, action as fromRecipeBook.AddRecipe);
    case fromRecipeBook.EDIT_RECIPE:
      return editRecipe(state, action as fromRecipeBook.EditRecipe);
    // case fromRecipeBook.SELECT_RECIPE:
    //   return selectRecipe(state, action as fromRecipeBook.SelectRecipe);
    case fromRecipeBook.DELETE_RECIPE:
      return deleteRecipe(state, action as fromRecipeBook.DeleteRecipe);
    default:
      return state;
  }
}

const addRecipe = (
  state: RecipeBookState,
  action: fromRecipeBook.AddRecipe
): RecipeBookState => {
  const updatedRecipes = [...state.recipes];

  updatedRecipes.push(action.payload);

  return updateObject(state, { recipes: updatedRecipes });
};

const editRecipe = (
  state: RecipeBookState,
  action: fromRecipeBook.EditRecipe
): RecipeBookState => {
  const updatedRecipes = [...state.recipes];

  console.log(updatedRecipes, 'OLDRECIPES');

  // console.log(state.selectedRecipeIndex);


    ////eis o problema...


  // updatedRecipes[state.selectedRecipeIndex] = action.payload;




  const editedRecipeIndex = updatedRecipes.findIndex(
    (recipe) => {
      console.log(recipe.id, action.payload.id)
        return recipe.id === action.payload.id;
    }
  )



  updatedRecipes[editedRecipeIndex] = action.payload;




  console.log(updatedRecipes, 'NEWRECIPES');

  return updateObject(state, {
    recipes: updatedRecipes,
    // selectedRecipeIndex: -1,
    // selectedRecipe: null,
  });
};

// const selectRecipe = (
//   state: RecipeBookState,
//   action: fromRecipeBook.SelectRecipe
// ): RecipeBookState => {
//   return updateObject(state, {
//     selectedRecipeIndex: action.payload.index,
//     selectedRecipe: action.payload.recipe,
//   });
// };

const deleteRecipe = (
  state: RecipeBookState,
  action: fromRecipeBook.DeleteRecipe
): RecipeBookState => {
  const updatedRecipes = [...state.recipes];


  const deletedRecipeIndex = updatedRecipes.findIndex(
    (recipe) => {
      console.log(recipe.id, action.payload)
        return recipe.id === action.payload;
    }
  )


  updatedRecipes.splice(deletedRecipeIndex, 1);

  return updateObject(state, {
    recipes: updatedRecipes,
    // selectedRecipeIndex: -1,
    // selectedRecipe: null,
  });
};

const startFetchRecipes = (
  state: RecipeBookState,
  action: fromRecipeBook.StartFetchRecipes
): RecipeBookState => {
  return updateObject(state, { isLoading: true, error: null });
};

const recipesFetchSuccess = (
  state: RecipeBookState,
  action: fromRecipeBook.RecipesFetchSuccess
): RecipeBookState => {
  return updateObject(state, {
    error: null,
    isLoading: false,
    recipes: action.payload.recipes,
  });
};

const recipesFetchFail = (
  state: RecipeBookState,
  action: fromRecipeBook.RecipesFetchFail
): RecipeBookState => {
  return updateObject(state, { error: action.payload });
};









const saveRecipesStart = (
  state: RecipeBookState,
  action: fromRecipeBook.SaveRecipesStart
): RecipeBookState => {


  return updateObject(state, { isLoading: true, error: null})


}


const saveRecipesFail = (
  state: RecipeBookState,
  action: fromRecipeBook.SaveRecipesFail
): RecipeBookState => {
  return updateObject(state, { isLoading: false, error: action.payload})

}


const saveRecipesSuccess = (
  state: RecipeBookState,
  action: fromRecipeBook.SaveRecipesSuccess
): RecipeBookState => {
  return updateObject(state, { isLoading: false, error: null})

}







// const endFetchRecipes = (
//   state: RecipeBookState,
//   action: fromRecipeBook.EndFetchRecipes
// ) => {
//   return updateObject(state, { isLoading: false});
// };
