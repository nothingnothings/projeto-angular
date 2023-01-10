// import { Injectable, Output } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { map, Subject } from 'rxjs';
// import { Ingredient } from './shared/ingredient.model';

// import * as ShoppingListActions from '../app/ShoppingList/store/shoppingListActions';

// import * as fromShoppingList from '../app/ShoppingList/store/shoppingList.reducer';

// @Injectable()
// export class ShoppingListService {
//   ingredientsChanged = new Subject<Ingredient[]>();

//   ingredientSelected = new Subject<number>();

//   private ingredients: Ingredient[] = [];

//   constructor(private store: Store<fromShoppingList.AppState>) {}

//   getIngredients() {
//     return [...this.ingredients];
//   }

//   getIngredient(index: number) {
//     console.log('TEST', 'LINE2');
//     console.log(this.ingredients);
//     return this.ingredients[index];
//   }

//   cleanupDeleteIngredients(recipeId: number) {
//     this.ingredients = this.ingredients.filter((ingredient) => {
//       return ingredient.recipeIndex !== recipeId;
//     });
//   }
// }
