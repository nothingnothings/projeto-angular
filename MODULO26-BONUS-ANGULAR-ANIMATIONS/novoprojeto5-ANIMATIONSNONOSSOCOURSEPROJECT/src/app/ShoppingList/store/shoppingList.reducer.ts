import * as ShoppingListActions from './shoppingListActions';

import * as fromRecipeBookActions from '../../recipeBook/store/recipeBookActions';

import { Ingredient } from '../../shared/ingredient.model';

import { updateObject } from '../../utility/updateObject';

export interface ShoppingListState {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient | null;
  selectedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Lettuce', 5, 0.1221412452154)],
  selectedIngredient: null,
  selectedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: ShoppingListState = initialState,

  action: ShoppingListActions.ShoppingListActionTypes
): ShoppingListState {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return addIngredient(state, action as ShoppingListActions.AddIngredient);
    case ShoppingListActions.ADD_INGREDIENTS:
      return addIngredients(
        state,
        action as ShoppingListActions.AddIngredients
      );
    case ShoppingListActions.DELETE_INGREDIENT:
      return removeIngredient(
        state,
        action as ShoppingListActions.RemoveIngredient
      );
      0;
    case ShoppingListActions.EDIT_INGREDIENT:
      return editIngredient(
        state,
        action as ShoppingListActions.EditIngredient
      );
    case ShoppingListActions.START_EDIT:
      return startEdit(state, action as ShoppingListActions.StartEdit);
    case ShoppingListActions.STOP_EDIT:
      return stopEdit(state, action as ShoppingListActions.StopEdit);
    case fromRecipeBookActions.SEND_INGREDIENTS_TO_SHOP_LIST:
      return sendRecipeIngredientsToShoppingList(
        state,
        action as fromRecipeBookActions.SendIngredientsToShopList
      );
    default:
      return state;
  }
}

const sendRecipeIngredientsToShoppingList = (
  state: ShoppingListState,
  action: fromRecipeBookActions.SendIngredientsToShopList
): ShoppingListState => {
  const updatedIngredients = state.ingredients.slice();

  updatedIngredients.push(...action.payload);

  return updateObject(state, { ingredients: updatedIngredients });
};

const addIngredient = (
  state: ShoppingListState,
  action: ShoppingListActions.AddIngredient
): ShoppingListState => {
  const updatedIngredients = [...state.ingredients];

  updatedIngredients.push(action.payload);

  return updateObject(state, { ingredients: updatedIngredients });
};

const addIngredients = (
  state: ShoppingListState,
  action: ShoppingListActions.AddIngredients
): ShoppingListState => {
  const updatedIngredients = [...state.ingredients];

  updatedIngredients.push(...action.payload);

  return updateObject(state, { ingredients: updatedIngredients });
};

const removeIngredient = (
  state: ShoppingListState,
  action: ShoppingListActions.RemoveIngredient
): ShoppingListState => {
  const updatedIngredients = [...state.ingredients];

  updatedIngredients.splice(state.selectedIngredientIndex, 1);

  return updateObject(state, {
    ingredients: updatedIngredients,
    selectedIngredient: null,
    selectedIngredientIndex: -1,
  });
};

const editIngredient = (
  state: ShoppingListState,
  action: ShoppingListActions.EditIngredient
): ShoppingListState => {
  const updatedIngredients = [...state.ingredients];

  updatedIngredients[state.selectedIngredientIndex] = action.payload;

  return updateObject(state, {
    ingredients: updatedIngredients,
    selectedIngredient: null,
    selectedIngredientIndex: -1,
  });
};

const startEdit = (
  state: ShoppingListState,
  action: ShoppingListActions.StartEdit
): ShoppingListState => {
  const updatedState = {
    ...state,
  };

  const ingredient = state.ingredients.find((ingredient, index) => {
    return index === action.payload;
  });

  if (!ingredient) {
    alert('Invalid Input, please try again.');
    return state;
  }

  return updateObject(updatedState, {
    selectedIngredient: ingredient,
    selectedIngredientIndex: action.payload,
  });
};

const stopEdit = (
  state: ShoppingListState,
  action: ShoppingListActions.StopEdit
): ShoppingListState => {
  const updatedState = {
    ...state,
  };

  return updateObject(updatedState, {
    selectedIngredient: null,
    selectedIngredientIndex: -1,
  });
};
