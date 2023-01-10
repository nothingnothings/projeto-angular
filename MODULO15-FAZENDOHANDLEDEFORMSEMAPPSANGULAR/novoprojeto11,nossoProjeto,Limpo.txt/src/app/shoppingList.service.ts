import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Potato', 1),
    new Ingredient('Tomato', 3),
    new Ingredient('Banana', 5),
  ];

  getIngredients() {
    return [...this.ingredients];
  }

  onIngredientAdd(ingredient: Ingredient) {
    console.log('RECEIVED');
    this.ingredients.push(ingredient);

    this.ingredientsChanged.next([...this.ingredients]);
  }
}
