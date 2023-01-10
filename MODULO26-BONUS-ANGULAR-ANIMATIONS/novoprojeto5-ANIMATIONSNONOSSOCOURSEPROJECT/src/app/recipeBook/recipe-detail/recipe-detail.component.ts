import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromRecipeBook from '../store/recipeBookActions';
import { AppState } from 'src/app';
import { map, Subscription, switchMap } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  animations: [
    trigger(
      'recipeDetailPage',

      [
        state(
          'in',
          style({
            opacity: '1',
          })
        ),

        transition(
          'void => *',

          [
            style({
              opacity: '0',
            }),

            animate(800),
          ]
        ),

      ]
    ),

  ]

})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  loadedRecipe: Recipe;
  id: number;

  loadedRecipeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadedRecipeSubscription = this.route.params
      .pipe(
        map((params: Params) => {
          return +params['id'];
        }),

        switchMap((id) => {
          this.id = id;
          return this.store.select('recipeBook');
        }),

        map((recipesState) => {
          const recipeIndex = recipesState.recipes.findIndex((recipe) => {
            return recipe.id === this.id;
          });

          return recipesState.recipes[recipeIndex];
        })
      )
      .subscribe((recipe) => {
        this.loadedRecipe = recipe;
      });
  }

  sendToShoppingList() {
    this.store.dispatch(
      new fromRecipeBook.SendIngredientsToShopList(
        this.loadedRecipe.ingredients
      )
    );

    this.router.navigate(['/shop-list']);
  }

  onEditRecipe() {
    this.router.navigate(['/recipe-book', this.id, 'edit']);
  }

  onDeleteRecipe() {
    this.store.dispatch(new fromRecipeBook.DeleteRecipe(this.id));

    this.router.navigate(['/recipe-book']);
  }

  ngOnDestroy(): void {
    if (this.loadedRecipeSubscription) {
      this.loadedRecipeSubscription.unsubscribe();
    }
  }
}
