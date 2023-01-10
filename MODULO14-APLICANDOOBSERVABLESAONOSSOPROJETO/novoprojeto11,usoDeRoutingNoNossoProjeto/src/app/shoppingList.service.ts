import { 
  
  
  // EventEmitter, ///AGORA VAMOS USAR UM 'SUBJECT' no lugar de 'EVENTEMITTER', pq a cross-component communication com ele é SIMPLESMENTE MELHOR..
  
  
  
  Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './shared/ingredient.model';


@Injectable()
export class ShoppingListService {
  // @Output() ingredientsChanged = new EventEmitter<Ingredient[]>();

  ingredientsChanged = new Subject<Ingredient[]>();



  //   ingredients: Ingredient[] = [  ///versão SEM O USO DE 'private' e 'getIngredients'...
  private ingredients: Ingredient[] = [
    // new Ingredient('Potato', 1, 1651882246336.7927),
    // new Ingredient('Tomato', 3, 1651882348842.3665),
    // new Ingredient('Banana', 5, 1651882373138.5793)

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
    // this.ingredientsChanged.emit([...this.ingredients]);  ///será captado por 'shoppingListComponent', no 'ngOnInit', por meio de 'subscribe'...
    this.ingredientsChanged.next([...this.ingredients]);

    // console.log(this.ingredients);
  }





}
