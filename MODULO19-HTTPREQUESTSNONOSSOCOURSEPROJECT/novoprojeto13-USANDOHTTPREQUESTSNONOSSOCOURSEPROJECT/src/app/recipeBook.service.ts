import {
  EventEmitter, ///TROCAMOS POR 'SUBJECT', que é simplesmente MELHOR como CROSS-COMPONENT COMMUNICATION TOOL....
  Injectable,
  Output,
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, Subject, tap } from 'rxjs';
import { Recipe } from './recipeBook/recipe.model';
import { Ingredient } from './shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Injectable()
export class RecipeBookService {
  private recipes: Recipe[] = [
    //professor colocou como PRIVATE....
    // new Recipe(
    //   'Chicken Wings',
    //   'Delicious chicken wings',
    //   'https://www.farmfor.com.br/wp-content/uploads/2022/02/coxinha-da-asa-superbowl.jpg',
    //   [
    //     new Ingredient('Potato', 1, 0),
    //     new Ingredient('Tomato', 2, 0),
    //     new Ingredient('Banana', 5, 0),
    //   ],
    //   0
    // ),
    // new Recipe(
    //   'Pork Chops',
    //   'Tasty pork chops, check them out',
    //   'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQsRbNYL4S-Noacb27Vi-sbWzURFRjW9YN8VOScbiJ0DxTAiGxTyqlNdG1TWHKN1xWqOV4UhHaFef-fBD8-PGo',
    //   [
    //     new Ingredient('Lettuce', 5, 1),
    //     new Ingredient('Apple', 4, 1),
    //     new Ingredient('Banana', 1, 1),
    //   ],
    //   1
    // ),
    // new Recipe(
    //   'Caesar Salad',
    //   'Fresh and healthy salad',
    //   'https://www.confeiteiradesucesso.com/wp-content/uploads/2019/06/ceasarsalad-fb.jpg',
    //   [
    //     new Ingredient('Pumpkin', 3, 2),
    //     new Ingredient('Meat', 9,  2),
    //     new Ingredient('Avocado', 4, 2),
    //   ],
    //   2
    // ),
  ];

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient
  ) {}

  getRecipes() {
    return [...this.recipes];
  }

  loadRecipes() {
    return this.http
      .get<{ [name: string]: Recipe }>(
        'https://recipebookdummyproject-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((data) => {
          const transformedRecipesArray: Recipe[] = [];

          console.log(data);

          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              transformedRecipesArray.push({ ...data[key] });
            }
          }

          transformedRecipesArray.map((recipe) => {  
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],   ////////SE NOSSA PROPRIEDADE 'ingredients' dessa recipe específica NÃO EXISTIR (um bug possível), VAMOS QUERER QUE OS INGREDIENTS SEJAM SETTADOS COMO UM EMPTY ARRAY....
            };
          });

          return transformedRecipesArray;
        })

        ,tap(
          (recipes) => {
            console.log('TEST')
            this.recipes = recipes;
            this.recipeItemsChanged.next([...recipes]);
          }
        )
      )
      // .subscribe((recipes) => { ///movido lá para 'header.component.ts'...
      //   this.recipes = recipes;
      //   this.recipes = recipes;

      //   this.recipeItemsChanged.next([...recipes]);
      // });
  }

  saveRecipes() {
    console.log('SAVED');
    return this.http
      .put(
        'https://recipebookdummyproject-default-rtdb.firebaseio.com/recipes.json', ////será um request de PUT, e não de 'POST'... --> ISSO PQ QUEREMOS SEMPRE OVERWRITTAR O VALUE ANTIGO DE 'recipes' com o nosso NOVO value...

        this.recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  // recipeItemClickedEmitter = new EventEmitter<Recipe>();

  recipeItemClickedEmitter = new Subject<Recipe>();

  recipeItemsChanged = new Subject<Recipe[]>();

  // loadedRecipe: Recipe;

  // recipeItemClicked(index: number) {

  //   const recipe = this.recipes[index];
  //   // this.recipeItemClickedEmitter.emit(recipe);

  //   this.recipeItemClickedEmitter.next(recipe);
  // }

  sendToShopList(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      ////minha versão do código --> downside: mtos events disparados, mas não há problema..
      this.shoppingListService.onIngredientAdd(ingredient);
      console.log('SENT');
    }

    ////after that, sends the user to the 'shoppingList' page...
  }

  getRecipe(id: number): Recipe {
    // return this.recipes[id];

    const selectedRecipe = this.recipes.find((recipe) => {
      return recipe.id === id;
    })!;
    return selectedRecipe;
  }

  editRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
  }

  onRecipeEdited(editedRecipe: Recipe, index: number) {
    // this.recipes[index] = editedRecipe;

   const recipeIndex =  this.recipes.findIndex(
      (recipe) => {
        return recipe.id === index;
      }
    )

    this.recipes[recipeIndex] = editedRecipe;


    console.log(this.recipes);

    this.recipeItemsChanged.next([...this.recipes]);
  }

  onRecipeAdded(newRecipe: Recipe) {
    this.recipes.push(newRecipe);

    this.recipeItemsChanged.next([...this.recipes]);
  }

  onRecipeDeleted(index: number) {
    this.recipes.splice(index, 1);
    this.recipeItemsChanged.next([...this.recipes]);
  }
}
