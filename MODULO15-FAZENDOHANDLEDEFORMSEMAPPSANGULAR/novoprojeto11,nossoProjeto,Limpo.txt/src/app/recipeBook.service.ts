import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipeBook/recipe.model';
import { Ingredient } from './shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Injectable()
export class RecipeBookService {
  private recipes: Recipe[] = [
    new Recipe(
      'Chicken Wings',
      'Delicious chicken wings',
      'https://www.farmfor.com.br/wp-content/uploads/2022/02/coxinha-da-asa-superbowl.jpg',
      [
        new Ingredient('Potato', 1),
        new Ingredient('Tomato', 3),
        new Ingredient('Banana', 5),
      ]
    ),
    new Recipe(
      'Pork Chops',
      'Tasty pork chops, check them out',
      'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQsRbNYL4S-Noacb27Vi-sbWzURFRjW9YN8VOScbiJ0DxTAiGxTyqlNdG1TWHKN1xWqOV4UhHaFef-fBD8-PGo',
      [
        new Ingredient('Potato', 1),
        new Ingredient('Tomato', 3),
        new Ingredient('Banana', 5),
      ]
    ),
    new Recipe(
      'Caesar Salad',
      'Fresh and healthy salad',
      'https://www.confeiteiradesucesso.com/wp-content/uploads/2019/06/ceasarsalad-fb.jpg',
      [
        new Ingredient('Potato', 1),
        new Ingredient('Tomato', 3),
        new Ingredient('Banana', 5),
      ]
    ),
  ];

  getRecipes() {
    return [...this.recipes];
  }

  recipeItemClickedEmitter = new Subject<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  sendToShopList(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      this.shoppingListService.onIngredientAdd(ingredient);
      console.log('SENT');
    }
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  editRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
  }
}
