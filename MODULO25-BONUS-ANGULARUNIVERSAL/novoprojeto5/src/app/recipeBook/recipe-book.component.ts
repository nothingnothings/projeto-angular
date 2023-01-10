import { Component, OnDestroy, OnInit, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoggingService } from '../logging.service';

import * as fromRecipeBook from './store/recipeBookActions';

import { AppState } from '..';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private store: Store<AppState>,

    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.loggingService.printLog('Hello from recipeBookModule');

    this.store.dispatch(new fromRecipeBook.StartFetchRecipes());
  }
}
