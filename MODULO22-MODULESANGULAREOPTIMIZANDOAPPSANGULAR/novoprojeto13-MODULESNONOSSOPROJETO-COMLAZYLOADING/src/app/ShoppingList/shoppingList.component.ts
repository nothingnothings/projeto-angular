import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shoppingList.component.html',
  styleUrls: ['./shoppingList.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[] = [
  //   // new Ingredient('Potato', 1, 1651882246336.7927),
  //   // new Ingredient('Tomato', 3, 1651882348842.3665),
  //   // new Ingredient('Banana', 5, 1651882373138.5793)

  //   new Ingredient('Potato', 1),
  //   new Ingredient('Tomato', 3),
  //   new Ingredient('Banana', 5),
  // ];


  ingredients: Ingredient[] = [];

  // selectedIngredient: Ingredient;


  private ingredientsChangedSubscription: Subscription;



  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) {
    
   
  }

  ngOnInit(): void {
    // this.ingredients = this.shoppingListService.ingredients;

    // this.ingredients = this.shoppingListService.getIngredients();


    this.loggingService.printLog('Hello from ShopListComponent!')
    
    this.ingredients = this.shoppingListService.getIngredients(); ////define o array inicial...

   this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      }
    )


  }

  // onIngredientAdded() {
  //   // this.ingredients.push(ingredient);
  //   // console.log(this.ingredients);

  //   this.shoppingListService.onIngredientAdded();
  // }

  onShoplistItemClick(index: number) {

    this.shoppingListService.loadShopListItem(index);


  }


  ngOnDestroy(): void {

    this.ingredientsChangedSubscription.unsubscribe();
  }


  // ingredientSelect(index: number) {
  //   this.selectedIngredient = this.ingredients[index];
  // }

  // ingredientRemoved(ingredientIndex: any) {
  //   this.ingredients.splice(ingredientIndex, 1);

  //   console.log(this.ingredients);
  // }
}
