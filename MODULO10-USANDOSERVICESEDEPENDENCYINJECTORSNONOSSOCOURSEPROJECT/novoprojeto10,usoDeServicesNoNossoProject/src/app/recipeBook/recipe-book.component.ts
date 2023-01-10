import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RecipeBookService } from '../recipeBook.service';

import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit {
  constructor(private recipeBookService: RecipeBookService) {}

  // loadedRecipe: Recipe;

  ngOnInit(): void {

    // this.loadedRecipe = this.recipeBookService.loadedRecipe;

  }

    // loadRecipe(recipe: any) {
    //   this.recipeBookService.loadedRecipeDetail()
    // }

  // loadedRecipeDetail(recipe: any) {
  //   console.log(recipe, 'AA');
  //   this.loadedRecipe = recipe;
  // }
}
