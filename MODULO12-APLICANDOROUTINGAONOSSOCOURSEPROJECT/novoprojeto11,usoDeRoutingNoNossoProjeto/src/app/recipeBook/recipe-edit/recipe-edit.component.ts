
import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeBookService } from 'src/app/recipeBook.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {




  editableRecipe: Recipe;
  recipeId: number;
  editMode: boolean = false;  ////'false' --> user vai querer ADICIONAR UM NOVO RECIPE... 'true' --> user vai querer EDITAR UM RECIPE QUE JÁ EXISTIA....s



  constructor(private recipeBookService: RecipeBookService, private route: ActivatedRoute, private router: Router) { }

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




    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];
        //este é o código que CHECA SE ESTAMOS EM EDIT MODE OU NÃO (checa a url)...
        this.editMode = params['id'] != null; /////OU SEJA, SE TIVERMOS UM 'ID' NA NOSSA URL, o 'editMode' ESTARÁ PRESENTE (pq aí vamos querer EDITAR AQUELA RECIPE, DAQUELE ID específico).... --> caso contrário, estaremos no modo de 'add a new recipe'....
      }
    )


    
      if (this.editMode) {
        this.editableRecipe = this.recipeBookService.getRecipe(this.recipeId);
      }
     










    // this.route.params.subscribe(
    //   (params: Params) => {




    //     const recipeId = params['id'];


    //     this.recipeId = recipeId;


    //     // const newRecipe = new Recipe('dummy', 'dummy', 'dummy', [{name: 'dummy', amount: 1}]);

    //     // 


    //   }
    // )

  





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
