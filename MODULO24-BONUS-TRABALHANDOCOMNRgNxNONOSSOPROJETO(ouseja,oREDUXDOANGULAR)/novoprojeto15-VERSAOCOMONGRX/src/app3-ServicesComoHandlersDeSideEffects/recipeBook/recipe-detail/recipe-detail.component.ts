import { Component, OnInit, Input } from '@angular/core';
import { RecipeBookService } from 'src/app/recipeBook.service';

import { Recipe } from '../recipe.model';

import { ActivatedRoute, Params, Router } from '@angular/router';
// import { ShoppingListService } from 'src/app/shoppingList.service'; ///substituído pelo NGRX...
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

import * as fromRecipeBook from '../store/recipeBookActions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {


  // loadedRecipe: Recipe;

  // loadedRecipes: Recipe[] = this.recipeBookService.getRecipes();



  loadedRecipe: Recipe;
  id: number;

  constructor(private recipeBookService: RecipeBookService, 
    private route: ActivatedRoute, 
    private router: Router, 
    // private shoppingListService: ShoppingListService, ///substituído pelo NGRX...
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
    
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


    this.route.params.subscribe(
      (params: Params) => {
        console.log('TEST');
        // this.loadedRecipe = this.loadedRecipes[+params['id']];

        // this.loadedRecipe = this.recipeBookService.getRecipes()[+params['id']]
        this.id = +params['id'];
        console.log(+params['id'])
        console.log(this.recipeBookService.getRecipe(+params['id']), 'LINE');
        console.log(this.recipeBookService.getRecipes());
        this.loadedRecipe = this.recipeBookService.getRecipe(+params['id']);

  
      }
    )






  }


  sendToShoppingList() {
    console.log('CLICKED');
    // this.recipeBookService.sendToShopList(this.loadedRecipe.ingredients);


      ///vou fazer dispatch, sim, mas DENTRO DO METHOD DE 'sendToShopList', lá no nosso 'recipeBookService' (mais conveniente fazer dispatches de dentro de services...)...
    // this.store.dispatch(new ShoppingListActions.AddIngredients(this.loadedRecipe.ingredients))



    this.recipeBookService.sendToShopList(this.loadedRecipe.ingredients);  ///dispatch de uma ACTION de DENTRO DO METHOD DE UM SERVICE...



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


    this.store.dispatch(new fromRecipeBook.DeleteRecipe());



    this.router.navigate(['/recipe-book']);


  }
}
