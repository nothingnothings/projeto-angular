import { Component, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';

import { AppState } from 'src/app';

import * as fromRecipeBook from '../store/recipeBookActions';
import { map, Subscription, switchMap } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  animations: [
    trigger(
      'recipeEditPage',

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
  ],
})
export class RecipeEditComponent implements OnInit {
  editableRecipe: Recipe;
  editableRecipeSubscription: Subscription;
  recipeId: number;
  editMode: boolean = false;

  recipeForm: UntypedFormGroup;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => {
          this.recipeId = +params['id'];
          this.editMode = params['id'] != null;
          return +params['id'];
        }),

        switchMap((id: number) => {
          return this.store.select('recipeBook');
        }),

        map((recipeBookState) => {
          const recipeIndex = recipeBookState.recipes.findIndex((recipe) => {
            return recipe.id === this.recipeId;
          });

          return recipeBookState.recipes[recipeIndex];
        })
      )
      .subscribe((recipe) => {
        this.editableRecipe = recipe;
      });

    this.initForm();
  }

  onSubmitForm() {
    console.log(this.recipeForm);
    console.log(this.recipeForm.get('ingredients.0')?.value.ingredient);

    let recipe: Recipe = {
      name: this.recipeForm.get('recipeName')?.value,
      description: this.recipeForm.get('description')?.value,
      imagePath: this.recipeForm.get('imagePath')?.value,
      ingredients: this.recipeForm.get('ingredients')?.value,

      id: this.recipeId,
    };

    console.log(recipe);

    const modifiedIngredients = recipe.ingredients.map((ingredient) => {
      return {
        ...ingredient,
        recipeIndex: recipe.id,
      };
    });

    recipe.ingredients = modifiedIngredients;

    if (this.editMode) {
      this.store.dispatch(new fromRecipeBook.EditRecipe(recipe));
      this.onNavigateAway();
    } else {
      recipe = {
        name: this.recipeForm.get('recipeName')?.value,
        description: this.recipeForm.get('description')?.value,
        imagePath: this.recipeForm.get('imagePath')?.value,
        ingredients: this.recipeForm.get('ingredients')?.value,
        id: Date.now() + Math.random(),
      };

      this.store.dispatch(new fromRecipeBook.AddRecipe(recipe));

      this.router.navigate(['/recipe-book']);
    }
  }

  onAddIngredient() {
    const newFormGroup: UntypedFormGroup = new UntypedFormGroup({
      ingredient: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      amount: new UntypedFormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
    });

    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(newFormGroup);
  }

  onRemoveIngredient(index: number) {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getIngredientControls() {
    return (<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }

  onNavigateAway() {
    this.router.navigate(['/recipe-book', this.recipeId]);
  }

  onCancel() {
    this.onNavigateAway();
  }

  private initForm() {
    if (this.editMode) {
      let recipeIngredients = new UntypedFormArray([]);

      if (this.editableRecipe['ingredients']) {
        recipeIngredients = new UntypedFormArray(
          this.editableRecipe.ingredients.map((ingredient) => {
            return new UntypedFormGroup({
              ingredient: new UntypedFormControl(ingredient.ingredient, [
                Validators.required,
              ]),

              amount: new UntypedFormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            });
          })
        );
      } else {
        recipeIngredients = new UntypedFormArray([
          new UntypedFormGroup({
            ingredient: new UntypedFormControl(null, [Validators.required]),
            amount: new UntypedFormControl(null, [
              Validators.required,

              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          }),
        ]);
      }

      this.recipeForm = new UntypedFormGroup({
        recipeName: new UntypedFormControl(this.editableRecipe.name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        imagePath: new UntypedFormControl(this.editableRecipe.imagePath, [
          Validators.required,
        ]),
        description: new UntypedFormControl(this.editableRecipe.description, [
          Validators.required,
          Validators.minLength(10),
        ]),
        ingredients: recipeIngredients,
      });
    } else {
      this.recipeForm = new UntypedFormGroup({
        recipeName: new UntypedFormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        imagePath: new UntypedFormControl(null, [Validators.required]),
        description: new UntypedFormControl(null, [
          Validators.required,
          Validators.minLength(10),
        ]),

        ingredients: new UntypedFormArray([
          new UntypedFormGroup({
            ingredient: new UntypedFormControl(null, [Validators.required]),
            amount: new UntypedFormControl(null, [
              Validators.required,

              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          }),
        ]),
      });
    }
  }
}
