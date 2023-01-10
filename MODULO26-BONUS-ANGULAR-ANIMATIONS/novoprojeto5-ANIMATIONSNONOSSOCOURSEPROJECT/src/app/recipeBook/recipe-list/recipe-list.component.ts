import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';

import { AppState } from 'src/app';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  animations: [
    trigger(
      'recipeListItem',

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

            style(
              {
                'opacity': '0',
                'transform': 'translateX(-15px)'
              }
            ),

            animate(800)
          ]
        ),



        transition(
          ':leave',
          [

            animate(800, style(
              {
                'opacity': '0',
                'transform': 'translateX(15px)'
              }
            ))
          ]
        )

      ]
    ),
  ],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  recipes: Recipe[] = [];

  isLoading = false;

  constructor(
    private store: Store<AppState>,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('recipeBook')
      .subscribe((recipeBookState) => {
        this.isLoading = recipeBookState.isLoading;
        this.recipes = recipeBookState.recipes;
      });
  }

  onNewRecipe() {
    this.router.navigate(['/recipe-book', 'new']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
