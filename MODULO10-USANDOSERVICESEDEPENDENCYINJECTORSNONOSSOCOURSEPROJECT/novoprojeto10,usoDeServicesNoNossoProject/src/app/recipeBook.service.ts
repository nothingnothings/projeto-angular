import { EventEmitter, Injectable, Output } from '@angular/core';
import { Recipe } from './recipeBook/recipe.model';
import { Ingredient } from './shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';


@Injectable()
export class RecipeBookService {
  private recipes: Recipe[] = [
    //professor colocou como PRIVATE....
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
    ///consequência direta de termos definido o array de 'recipes' como PRIVATE....
    return [...this.recipes]; //mesma coisa que 'this.recipes.slice();'
  }

  @Output() recipeItemClickedEmitter = new EventEmitter<Recipe>();

  // loadedRecipe: Recipe;

  recipeItemClicked(index: number) {
    // this.loadedRecipe = this.recipes[index];
    // console.log(this.loadedRecipe);
    // this.recipeItemClickedEmitter.emit(this.loadedRecipe);

    const recipe = this.recipes[index];
    this.recipeItemClickedEmitter.emit(recipe);
  }



  constructor(private shoppingListService: ShoppingListService) {

  }

  sendToShopList(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {   ////minha versão do código --> downside: mtos events disparados, mas não há problema..
        this.shoppingListService.onIngredientAdd(ingredient);
        console.log('SENT');
        }


    ////after that, sends the user to the 'shoppingList' page...


  }
}
