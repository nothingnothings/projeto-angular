import { Component, OnInit, Input } from '@angular/core';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
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
  editMode: boolean = false; ////'false' --> user vai querer ADICIONAR UM NOVO RECIPE... 'true' --> user vai querer EDITAR UM RECIPE QUE JÁ EXISTIA....s

  recipeForm: FormGroup;

  constructor(
    private recipeBookService: RecipeBookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const recipeId = this.route.snapshot.params;  ///funciona só 1 vez... queremos mais...

    // this.route.queryParams.subscribe( //////MINHA VERSÃO DO CÓDIGO.
    //   (queryParams: Params) => {
    //       // this.allowEdit = queryParams['allowEdit'] === '1' ?  true : false;

    //       if (queryParams['allowEdit'] === '1') {
    //         const id = this.route.snapshot.params['id'];
    //         this.editableRecipe = this.recipeBookService.getRecipe(id);
    //         this.recipeId = id;
    //       } else {
    //         alert('Failed to edit recipe. Please ensure your authentication status.')
    //         this.router.navigate(['/']);
    //       }

    //       // const id = this.route.snapshot.params['id'];
    //       // this.editableRecipe = this.recipeBookService.getRecipe(id);

    //   }
    // )





    this.recipeForm = new FormGroup({
      'recipeName': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      'imagePath': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required, Validators.minLength(10)]),

      'ingredients': new FormArray([
        new FormGroup({
          'ingredient': new FormControl(null, [
            Validators.required,
            // Validators.minLength(5),
          ]),
          'amount': new FormControl(null, [
            Validators.required,
            Validators.min(1),
          ]),
        }),
      ]),
    });

    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      //este é o código que CHECA SE ESTAMOS EM EDIT MODE OU NÃO (checa a url)...
      this.editMode = params['id'] != null; /////OU SEJA, SE TIVERMOS UM 'ID' NA NOSSA URL, o 'editMode' ESTARÁ PRESENTE (pq aí vamos querer EDITAR AQUELA RECIPE, DAQUELE ID específico).... --> caso contrário, estaremos no modo de 'add a new recipe'....
    });

    if (this.editMode) {
      this.editableRecipe = this.recipeBookService.getRecipe(this.recipeId);
    }

    // this.getRecipeFormGroups();

    // this.route.params.subscribe(
    //   (params: Params) => {

    //     const recipeId = params['id'];

    //     this.recipeId = recipeId;

    //     // const newRecipe = new Recipe('dummy', 'dummy', 'dummy', [{name: 'dummy', amount: 1}]);

    //     //

    //   }
    // )

  
  }

  onSubmitForm() {
    console.log(this.recipeForm);
    console.log(this.recipeForm.get('ingredients.0')?.value.ingredient) 
  }

  onAddIngredient() {
    const newFormGroup: FormGroup = new FormGroup({
      'ingredient': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
    });

    (<FormArray>this.recipeForm.get('ingredients')).push(newFormGroup);
  }

  getIngredientControls() {
    // console.log((<FormArray>this.recipeForm.get('ingredients')).controls);
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  // onEditRecipe() {

  //   if (this.allowEdit) {
  //     this.recipeBookService.editRecipe(this.recipeId, this.editableRecipe);
  //   } else {
  //     alert('Failed to edit recipe. Please ensure your authentication status.')
  //     this.router.navigate(['/']);
  //   }

  // }
}
