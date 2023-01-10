import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shoppingList.component.html',
  styleUrls: ['./shoppingList.component.css'],
})
export class ShoppingListComponent implements OnInit {



  ingredients: Ingredient[] = [

    new Ingredient('Potato', 1, 1651882246336.7927),
    new Ingredient('Tomato', 3, 1651882348842.3665),
    new Ingredient('Banana', 5, 1651882373138.5793)

  ];


  selectedIngredient: Ingredient;

  constructor() {}

  ngOnInit(): void {}


  ingredientAdded(ingredient: Ingredient) {

    this.ingredients.push(ingredient);
    console.log(this.ingredients);

  }

  ingredientSelect(index: number) {
      this.selectedIngredient = this.ingredients[index];
  }


  ingredientRemoved(ingredientIndex: any) {


    this.ingredients.splice(ingredientIndex, 1);

    console.log(this.ingredients);
  }
}
