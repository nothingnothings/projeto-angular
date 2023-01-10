import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import {
  Form,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeBookService } from 'src/app/recipeBook.service'; ///SUBSTITUÍDO PELO NGRX...
import { Recipe } from '../recipe.model';
// import { AppState } from '../store/recipeBook.reducer';

import { AppState } from 'src/app';

import * as fromRecipeBook from '../store/recipeBookActions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  editableRecipe: Recipe;
  recipeId: number;
  editMode: boolean = false;

  recipeForm: UntypedFormGroup;






  constructor(
    private recipeBookService: RecipeBookService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.recipeForm = new FormGroup({
    //   recipeName: new FormControl(null, [
    //     Validators.required,
    //     Validators.minLength(3),
    //   ]),
    //   imagePath: new FormControl(null, [Validators.required]),
    //   description: new FormControl(null, [
    //     Validators.required,
    //     Validators.minLength(10),
    //   ]),

    //   ingredients: new FormArray([
    //     new FormGroup({
    //       ingredient: new FormControl(null, [Validators.required]),
    //       amount: new FormControl(null, [
    //         Validators.required,
    //         Validators.min(1),
    //       ]),
    //     }),
    //   ]),
    // });

    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];

      this.editMode = params['id'] != null;


      this.initForm();
    });

    // if (this.editMode) {
    //   this.editableRecipe = this.recipeBookService.getRecipe(this.recipeId);
    // }

    // this.getRecipeFormGroups();

   
  }

  onSubmitForm() {
    console.log(this.recipeForm);
    console.log(this.recipeForm.get('ingredients.0')?.value.ingredient);


    const recipe: Recipe = {
      name: this.recipeForm.get('recipeName')?.value,
      description: this.recipeForm.get('description')?.value,
      imagePath: this.recipeForm.get('imagePath')?.value,
      ingredients: this.recipeForm.get('ingredients')?.value,
      id: Date.now() + Math.random()
    }

    console.log(recipe);



    const modifiedIngredients = recipe.ingredients.map(
      (ingredient) => {
          return {
            ...ingredient, 
            recipeIndex: recipe.id
          }
      }
    )

    recipe.ingredients = modifiedIngredients;


    if (this.editMode) {
      console.log('EDITMODE')
      // this.recipeBookService.onRecipeEdited(recipe, this.recipeId);

      this.store.dispatch(new fromRecipeBook.EditRecipe(recipe));
      this.onNavigateAway();
    } else {

      this.store.dispatch(new fromRecipeBook.AddRecipe(recipe));
      // this.recipeBookService.onRecipeAdded(recipe);

      this.router.navigate(['/recipe-book'])
    }
   


  }

  onAddIngredient() {
    const newFormGroup: UntypedFormGroup = new UntypedFormGroup({
      'ingredient': new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      'amount': new UntypedFormControl(null, [Validators.required, Validators.min(1)]),
    });

    console.log('TEST');

    ///usamos essa escrita typescript para COMUNICAR AO ANGULAR QUE ESSE coiso de 'ingredients' é um FORMARRAY (pq ele não vai saber isso de pronto)...
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(newFormGroup);
  }






  onRemoveIngredient(index: number) {
      // console.log(index);
      //  console.log( this.recipeForm.get('ingredients')?.value[index]);
      //  console.log(this.recipeForm.get('ingredients')?.value);

      // const patchedIngredients = this.recipeForm.get('ingredients')?.value.splice(index, 1);



      // console.log(patchedIngredients)

      // this.recipeForm.patchValue(
      //   {
      //   'ingredients': patchedIngredients
      //   }
      // )

      (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);
       
  }

  getIngredientControls() {  ///// This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).
    return (<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }



  onNavigateAway() {
    this.router.navigate(['/recipe-book', this.recipeId])
  }

  onCancel() {
    this.onNavigateAway();
       
  }




  private initForm() {


    if (this.editMode) {


      this.editableRecipe = this.recipeBookService.getRecipe(this.recipeId);

      let recipeIngredients = new UntypedFormArray([]);

      if (this.editableRecipe['ingredients']) {///entra-se nesse block SE TIVERMOS UMA RECIPE, E SE ELA TIVER INGREDIENTS NO SEU INTERIOR (interior não é EMPTY)....
       recipeIngredients = new UntypedFormArray(this.editableRecipe.ingredients.map(
          (ingredient) => {
            return new UntypedFormGroup({
              'ingredient': new UntypedFormControl(ingredient.ingredient, [Validators.required]),
              // 'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)] )
              'amount': new UntypedFormControl(ingredient.amount, [Validators.required, 
                Validators.pattern(/^[1-9]+[0-9]*$/)] ) ////só vai deixar que números POSITIVOS (que não sejam 0 ou inferiores) possam ser inputtados....
            })
          }
        ))
      } else {
        recipeIngredients = new UntypedFormArray([
          new UntypedFormGroup({
            'ingredient': new UntypedFormControl(null, [Validators.required]),
            'amount': new UntypedFormControl(null, [
              Validators.required,
              // Validators.min(1), ////só vai deixar que números POSITIVOS (que não sejam 0 ou inferiores) possam ser inputtados...
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ]),
          }),
        ])
      }




      this.recipeForm = new UntypedFormGroup({
        'recipeName': new UntypedFormControl(this.editableRecipe.name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        'imagePath': new UntypedFormControl(this.editableRecipe.imagePath, [Validators.required]),
        'description': new UntypedFormControl(this.editableRecipe.description, [
          Validators.required,
          Validators.minLength(10),
        ]),
        'ingredients': recipeIngredients

     
      });
    }   else  {

      this.recipeForm = new UntypedFormGroup({
        'recipeName': new UntypedFormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        'imagePath': new UntypedFormControl(null, [Validators.required]),
        'description': new UntypedFormControl(null, [
          Validators.required,
          Validators.minLength(10),
        ]),
  
        'ingredients': new UntypedFormArray([
          new UntypedFormGroup({
            'ingredient': new UntypedFormControl(null, [Validators.required]),
            'amount': new UntypedFormControl(null, [
              Validators.required,
              // Validators.min(1),
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ]),
          }),
        ]),
      });



    }


  }


}
