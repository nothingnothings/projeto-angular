import { Component, OnInit, Output } from '@angular/core';
// import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipeBookService } from '../recipeBook.service';

// import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit {




  constructor(private recipeBookService: RecipeBookService, private route: ActivatedRoute) {}

  ngOnInit(): void {

      this.recipeBookService.loadRecipes();
      // console.log(this.recipeBookService.getRecipes(), 'RECIPES');

  

  }


}
