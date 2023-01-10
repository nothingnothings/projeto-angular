import { Component, OnInit, Input } from '@angular/core';
import { RecipeBookService } from 'src/app/recipeBook.service';

import { Recipe } from '../recipe.model';

import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  loadedRecipe: Recipe;
  id: number;

  constructor(
    private recipeBookService: RecipeBookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log('TEST');

      this.id = +params['id'];
      this.loadedRecipe = this.recipeBookService.getRecipe(+params['id']);
    });
  }

  sendToShoppingList() {
    console.log('CLICKED');
    this.recipeBookService.sendToShopList(this.loadedRecipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['/recipe-book', this.id, 'edit']);
  }
}
