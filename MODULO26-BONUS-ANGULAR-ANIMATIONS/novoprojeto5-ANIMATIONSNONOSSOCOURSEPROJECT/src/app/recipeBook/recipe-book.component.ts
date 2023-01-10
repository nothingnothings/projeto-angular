import { Component, OnDestroy, OnInit, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoggingService } from '../logging.service';

import * as fromRecipeBook from './store/recipeBookActions';

import { AppState } from '..';
import { Subscription } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  animations: [
    trigger(
      'recipeList',

      [
        state(
          'in',

          style({
            opacity: '1',
            transform: 'translateX(0)',
          })
        ),

        transition(
          ':enter',

          [
            style({
              opacity: '0',
              transform: 'translateX(-30px)',
            }),

            animate(800),
          ]
        ),
      ]
    ),
  ],
})
export class RecipeBookComponent implements OnInit {
  isLoading = false;

  constructor(
    private store: Store<AppState>,

    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.loggingService.printLog('Hello from recipeBookModule');

    this.store.dispatch(new fromRecipeBook.StartFetchRecipes());
  }
}
