import { Injectable, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subject } from 'rxjs';
import { Ingredient } from './shared/ingredient.model';


import * as ShoppingListActions from '../app/ShoppingList/store/shoppingListActions';
// import { ShoppingListState } from './ShoppingList/store/shoppingList.reducer';

import * as fromShoppingList from '../app/ShoppingList/store/shoppingList.reducer';

@Injectable()
export class ShoppingListService {
  // ingredientsChanged = new Subject<Ingredient[]>();

  // ingredientSelected = new Subject<number>();

  // private ingredients: Ingredient[] = [];  ///não será mais utilizado, pq agora nosso 'source of truth' será o STORE DO NGRx...





  // constructor(
    
  //   // private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  //   // private store: Store<{shoppingList: ShoppingListState}>  //define a ''aparência'' de nosso state/reducer desse 'shoppingList' slice..
  //   private store: Store<fromShoppingList.AppState>  
  //   ) {}

  // getIngredients() {
  //   return [...this.ingredients];  ///sem o NGRX 

  //   // return this.store.select('shoppingList');


  // }

  // onIngredientAdd(ingredient: Ingredient) { ///passamos para o REDUCER
  //   console.log('RECEIVED');


  //     this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient)); //vamos fazer dispatch de uma action DE DENTRO DE NOSSO SERVICE, SIM...
     
     
     
  //     // this.ingredients.push(ingredient);
  //     // this.ingredientsChanged.next([...this.ingredients]);

  //   // this.ingredients.push(ingredient);

  //   // this.ingredientsChanged.next([...this.ingredients]);
  // }

  // loadShopListItem(index: number) {
  //   this.ingredientSelected.next(index);
  // }

  // getIngredient(index: number) {

  //   console.log('TEST', 'LINE2')
  //   console.log(this.ingredients);
  //   return this.ingredients[index]; //código sem NGRX



  // //  const subscription = this.store.select('shoppingList').pipe( ///código NGRX
  // //       map(
  // //         (shoppingListData) => {
  // //           return shoppingListData.ingredients[index]; //vamos querer pegar APENAS ESSE INGREDIENT AÍ, de nosso state de 'ingredients', na slice de 'shoppingList' de nosso state/store...
  // //         }
  // //       )
  // //     )
  // //     .subscribe(
  // //       (ingredient) => {
  // //         subscription.unsubscribe();  ////cleanup work
  // //         return ingredient;
  // //       }
  // //     )

  // //     return subscription;



  
  // }

  // editIngredient(index: number, ingredient: Ingredient) {
  //   // this.ingredients[index] = ingredient; ///código que NAÕ USAVA O 'NGRX'...

  //   // this.ingredientsChanged.next([...this.ingredients]);
  //   this.store.dispatch(new ShoppingListActions.EditIngredient({index: index, ingredient: ingredient}))
  // }

  // deleteIngredient(index: number) {
  //   // this.ingredients.splice(index, 1);  ///código que NAÕ USAVA O 'NGRX'...

  //   // this.ingredientsChanged.next([...this.ingredients]);


  //     this.store.dispatch(new ShoppingListActions.RemoveIngredient(index));

  // }

  // cleanupDeleteIngredients(recipeId: number) {
  //   this.ingredients = this.ingredients.filter((ingredient) => {
  //     // console.log(recipeId);
  //     // console.log(ingredient.recipeIndex);
  //     return ingredient.recipeIndex !== recipeId;
  //   });

  // }


  // onIngredientClicked(index: number) {

  //   this.store.dispatch(new ShoppingListActions.StartEdit(index));

    
  // }
}
