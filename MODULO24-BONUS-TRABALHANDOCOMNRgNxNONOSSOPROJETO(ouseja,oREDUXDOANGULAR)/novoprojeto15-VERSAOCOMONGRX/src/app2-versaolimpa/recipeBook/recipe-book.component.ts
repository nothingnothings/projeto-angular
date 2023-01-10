import { Component, OnInit, Output } from '@angular/core';
// import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggingService } from '../logging.service';

import { RecipeBookService } from '../recipeBook.service';

// import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit {




  constructor(private recipeBookService: RecipeBookService, private route: ActivatedRoute, private loggingService: LoggingService) {}

  ngOnInit(): void {


      this.loggingService.printLog('Hello from recipeBookModule');
      this.recipeBookService.loadRecipes();
      // console.log(this.recipeBookService.getRecipes(), 'RECIPES');

  

  }


}
