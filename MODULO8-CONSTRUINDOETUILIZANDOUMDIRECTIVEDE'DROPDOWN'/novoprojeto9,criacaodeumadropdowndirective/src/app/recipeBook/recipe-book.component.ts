import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit {
  constructor() {}

  loadedRecipe: Recipe;

  ngOnInit(): void {}

  loadedRecipeDetail(recipe: any) {
    console.log(recipe, 'AA');
    this.loadedRecipe = recipe;
  }
}
