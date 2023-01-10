import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeBookService } from 'src/app/recipeBook.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private recipeBookService: RecipeBookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeBookService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['/recipe-book', 'new']);
  }
}
