import { Component, OnInit, Input } from '@angular/core';
import { RecipeBookService } from 'src/app/recipeBook.service';

import { Recipe } from '../recipe.model';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {


  loadedRecipe: Recipe;



  constructor(private recipeBookService: RecipeBookService) { 

    // this.recipeBookService.recipeItemClickedEmitter.subscribe(
    //   (data: Recipe) => {
    //       console.log(data);
    //   }
    // )

    this.recipeBookService.recipeItemClickedEmitter.subscribe(
      (data) => {
          this.loadedRecipe = data;

      }
    )


  }



  ngOnInit(): void {

  }


  sendToShoppingList() {
    console.log('CLICKED');
    this.recipeBookService.sendToShopList(this.loadedRecipe.ingredients);
  }


}
