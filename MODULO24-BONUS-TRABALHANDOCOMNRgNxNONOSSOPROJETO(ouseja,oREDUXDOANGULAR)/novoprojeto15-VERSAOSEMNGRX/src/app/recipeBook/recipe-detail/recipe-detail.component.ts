import { Component, OnInit, Input } from '@angular/core';
import { RecipeBookService } from 'src/app/recipeBook.service';

import { Recipe } from '../recipe.model';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shoppingList.service';

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

  constructor(private recipeBookService: RecipeBookService, private route: ActivatedRoute, private router: Router, private shoppingListService: ShoppingListService) { 

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
    this.recipeBookService.sendToShopList(this.loadedRecipe.ingredients);
    this.router.navigate(['/shop-list'])
  }




  onEditRecipe() {

    this.router.navigate(['/recipe-book', this.id, 'edit']);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); //SINTAXE ALTERNATIVA.


  }




  onDeleteRecipe() {


    this.recipeBookService.onRecipeDeleted(this.id);
    this.shoppingListService.cleanupDeleteIngredients(this.id);
    console.log(this.shoppingListService.getIngredients());

    // this.router.navigate(['/recipe-book']);

    this.router.navigate(['/recipe-book']);


  }
}
