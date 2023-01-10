import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RecipeBookService } from 'src/app/recipeBook.service';

import { Recipe } from '../recipe.model';

import { ActivatedRoute, Params, Router } from '@angular/router';
// import { ShoppingListService } from 'src/app/shoppingList.service'; ///substituído pelo NGRX...
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

import * as fromRecipeBook from '../store/recipeBookActions';
import { AppState } from 'src/app';
import { findIndex, map, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {


  // loadedRecipe: Recipe;

  // loadedRecipes: Recipe[] = this.recipeBookService.getRecipes();



  loadedRecipe: Recipe;
  id: number;



  loadedRecipeSubscription: Subscription;

  constructor(private recipeBookService: RecipeBookService, 
    private route: ActivatedRoute, 
    private router: Router, 
    // private shoppingListService: ShoppingListService, ///substituído pelo NGRX...
    private store: Store<AppState>
    
    ) { 

    // this.recipeBookService.recipeItemClickedEmitter.subscribe(
    //   (data: Recipe) => {
    //       console.log(data);
    //   }
    // )

    // this.recipeBookService.recipeItemClickedEmitter.subscribe( ////SEM O USO DE ROUTING....
    //   (data) => {
    //       this.loadedRecipe = data;

    //   }
    // )




    



  }



  ngOnInit(): void {



    //     const recipeId = this.route.snapshot.params['id'];
    //     console.log(recipeId);

    ////approach ALTERNATIVA...
    // const recipeId = +this.route.snapshot.params['id'];
    // this.loadedRecipe = this.serviceBookService.getRecipes()[recipeId]
    //this.loadedRecipe = this.serviceBookService.getRecipe(recipeId)



    // this.route.params.subscribe(
    //   (params: Params) => {
    //     console.log('TEST');
    //     // this.loadedRecipe = this.loadedRecipes[+params['id']];

    //     // this.loadedRecipe = this.recipeBookService.getRecipes()[+params['id']]
    //     this.id = +params['id'];
    //     console.log(+params['id'])
    //     // console.log(this.recipeBookService.getRecipe(+params['id']), 'LINE');
    //     // console.log(this.recipeBookService.getRecipes());
      


    //     //SUBSTITUÍDO PELO 'NGRX/EFFECTS'...
    //     // this.loadedRecipe = this.recipeBookService.getRecipe(+params['id']);




    //     this.loadedRecipeSubscription = this.store.select('recipeBook').
    //     pipe(
    //       map(
    //         (recipeBookData) => {
    
    //           const recipeIndex = recipeBookData.recipes.findIndex((recipe) => {return recipe.id === this.id})
    
    
    //           return recipeBookData.recipes[recipeIndex]
    //         }
    //       )
    //     ).
    //     subscribe(
    
    //       (recipe: Recipe) => {
    
    //         console.log('HAPPENED', recipe);
    
    //       this.loadedRecipe = recipe;
    //       console.log(this.loadedRecipe);
    //       }
    //     )

  
    //   }
    // )




      ////approach MENOS ELEGANTE DE 'CHAINAR OBSERVABLES' (chain do observable de PARAMS com o observable da STORE, que utiliza a data desse observable de 'params')....
      /////com o approach n1, menos elegante, CHAINAMOS OBSERVABLES... JÁ COM O APPROACH N2, MAIS ELEGANTE, __ FUNDIMOS OS 2 OBSERVABLES EM UM 'GRANDE OBSERVABLE'...



    // this.route.params.subscribe((params: Params) => {


    //   this.id = +params['id'];

    //   this.loadedRecipeSubscription = this.store
    //     .select('recipeBook')
    //     .pipe(
    //       map((recipeBookData) => {
    //         const recipeIndex = recipeBookData.recipes.findIndex((recipe) => {
    //           return recipe.id === this.id;
    //         });

    //         return recipeBookData.recipes[recipeIndex];
    //       })
    //     )
    //     .subscribe((recipe: Recipe) => {
       

    //       this.loadedRecipe = recipe;
  
    //     });
    // });




    ///APPROACH N2, mais ELEGANTE: FUNDIMOS OS 2 OBSERVABLES EM 1 SÓ, por meio do uso de 'switchMap()' no primeiro observable, para TROCAR O observable de 'params' pelo OBSERVABLE DE 'store' (que é de onde tiraremos nossa RECIPE DATA)...
    ////-> VAMOS USAR ESSE 'switchMap()' PARA _ TROCAR__ NOSSO OBSERVABLE DE 'params' PELO OBSERVABLE DE 'store', que o SUBSTITUIRÁ....





    ////observable GIGANTE (com switchMap para 'trocar'/substituir um pelo outro, para que consigamos usar a data do 'params' com o observable do 'store' para aí RETRIEVARMOS A DATA DA RECIPE QEU SELECIONAMOS)....
   this.loadedRecipeSubscription = this.route.params.pipe(

      map(
        (params: Params) => {

          return +params['id'];
        }
      ),

      switchMap(
        (id) => {
            this.id = id;
            return this.store.select('recipeBook'); ///faz com que o observable agora seja ESTE AQUI... (e não mais o 'params')... --> quer dizer que isso vai RETORNAR O STATE DE 'recipeBook', em outras palavras...
        }
      ),

      map(
        (recipesState) => {

          const recipeIndex = recipesState.recipes.findIndex(
            (recipe) => {
              return recipe.id === this.id;
            }
          )

          return recipesState.recipes[recipeIndex];
        }
      )

    ).subscribe((recipe) => {
          this.loadedRecipe = recipe;
    });








  }


  sendToShoppingList() {
    console.log('CLICKED');
    // this.recipeBookService.sendToShopList(this.loadedRecipe.ingredients);


      ///vou fazer dispatch, sim, mas DENTRO DO METHOD DE 'sendToShopList', lá no nosso 'recipeBookService' (mais conveniente fazer dispatches de dentro de services...)...
    // this.store.dispatch(new ShoppingListActions.AddIngredients(this.loadedRecipe.ingredients))



    // this.recipeBookService.sendToShopList(this.loadedRecipe.ingredients);  ///dispatch de uma ACTION de DENTRO DO METHOD DE UM SERVICE...  ///SUBSTITUÍMOS COMPLETAMENTE PELO NGRX...




    this.store.dispatch(new fromRecipeBook.SendIngredientsToShopList(this.loadedRecipe.ingredients));



    this.router.navigate(['/shop-list'])
  }




  onEditRecipe() {

    this.router.navigate(['/recipe-book', this.id, 'edit']);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); //SINTAXE ALTERNATIVA.


  }




  onDeleteRecipe() {


    // this.recipeBookService.onRecipeDeleted(this.id);   ///vamos substituir pela lógica de 'NGRX' (em vez dos services e subjects, usados normalmente)...
    // this.shoppingListService.cleanupDeleteIngredients(this.id);
    // console.log(this.shoppingListService.getIngredients());



    // this.router.navigate(['/recipe-book']);


    this.store.dispatch(new fromRecipeBook.DeleteRecipe(this.id));



    this.router.navigate(['/recipe-book']);


  }




  ngOnDestroy(): void {


    if (this.loadedRecipeSubscription) {
      this.loadedRecipeSubscription.unsubscribe();
    }

  }


  
}
