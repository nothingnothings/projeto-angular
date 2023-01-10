import { ActionReducerMap } from '@ngrx/store';
import { recipeBookReducer, RecipeBookState } from 'src/app/recipeBook/store/recipeBook.reducer';
import { AuthReducer, AuthState } from './auth/store/auth.reducer';
import { shoppingListReducer, ShoppingListState } from './ShoppingList/store/shoppingList.reducer';

export const rootReducer = {};

export interface AppState { //// 'AppState' é usado para DEFINIR O 'APPLICATION WIDE STATE'... 
  shoppingList: ShoppingListState;
  recipeBook: RecipeBookState;
  auth: AuthState;

}



export const reducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingListReducer,
  recipeBook: recipeBookReducer,
  auth: AuthReducer
};
