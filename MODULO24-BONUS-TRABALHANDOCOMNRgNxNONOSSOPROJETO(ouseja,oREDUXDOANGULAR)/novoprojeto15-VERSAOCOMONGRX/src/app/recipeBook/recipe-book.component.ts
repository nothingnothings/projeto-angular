import { Component, OnDestroy, OnInit, Output } from '@angular/core';
// import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoggingService } from '../logging.service';

// import { RecipeBookService } from '../recipeBook.service';


import * as fromRecipeBook from './store/recipeBookActions';
// import { AppState } from './store/recipeBook.reducer';

import { AppState
 } from '..';
import { Subscription } from 'rxjs';

// import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit {



  isLoading: boolean = false;

  constructor(
    // private recipeBookService: RecipeBookService, 
    // private route: ActivatedRoute, 
    private store: Store<AppState>,  ///USO DO NGRx....
    
    private loggingService: LoggingService) {}

  ngOnInit(): void {


      this.loggingService.printLog('Hello from recipeBookModule');
      // this.recipeBookService.loadRecipes(); ///substituído pelo NGRX...


     this.store.dispatch(new fromRecipeBook.StartFetchRecipes());
      // console.log(this.recipeBookService.getRecipes(), 'RECIPES');

  

  }


  


}
