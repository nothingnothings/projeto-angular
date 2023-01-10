import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeBookService } from 'src/app/recipeBook.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  editableRecipe: Recipe;
  recipeId: number;
  editMode: boolean = false;

  constructor(
    private recipeBookService: RecipeBookService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];

      this.editMode = params['id'] != null;
    });

    if (this.editMode) {
      this.editableRecipe = this.recipeBookService.getRecipe(this.recipeId);
    }
  }
}
