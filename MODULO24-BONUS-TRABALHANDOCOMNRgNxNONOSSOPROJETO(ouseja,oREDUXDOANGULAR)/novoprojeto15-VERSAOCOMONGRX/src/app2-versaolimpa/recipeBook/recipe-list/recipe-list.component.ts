import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeBookService } from 'src/app/recipeBook.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {


  // @Output() listItemDetail = new EventEmitter<Recipe>();

  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Chicken Wings',
  //     'Delicious chicken wings',
  //     'https://www.farmfor.com.br/wp-content/uploads/2022/02/coxinha-da-asa-superbowl.jpg'
  //   ),
  //   new Recipe(
  //     'Pork Chops',
  //     'Tasty pork chops, check them out',
  //     'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQsRbNYL4S-Noacb27Vi-sbWzURFRjW9YN8VOScbiJ0DxTAiGxTyqlNdG1TWHKN1xWqOV4UhHaFef-fBD8-PGo'
  //   ),
  //   new Recipe(
  //     'Caesar Salad',
  //     'Fresh and healthy salad',
  //     'https://www.confeiteiradesucesso.com/wp-content/uploads/2019/06/ceasarsalad-fb.jpg'
  //   ),
  // ];]

  recipesChangedSubscription: Subscription;



  recipes: Recipe[] = [];

  constructor(private recipeBookService: RecipeBookService, private router: Router) {



  }

  ngOnInit(): void {
    // this.recipes = this.recipeBookService.recipes;
    this.recipes = this.recipeBookService.getRecipes();





   this.recipesChangedSubscription = this.recipeBookService.recipeItemsChanged.subscribe(
      (recipes) => {
          this.recipes = recipes;
      }
    )
  }

  // onRecipeItemClick(index: number) {
  //   console.log('TEST');
  //   // console.log(index)


  //   this.recipeBookService.recipeItemClicked(index);

        
  //   // this.listItemDetail.emit(selectedRecipe);
  // }










  onNewRecipe() {
      this.router.navigate(['/recipe-book', 'new']);


      ///sintaxe alternativa: this.router.navigate(['new'], {relativeTo: this.route})  ///usa um 'relative path' em vez de um absolute.... 
  }


  ngOnDestroy(): void {
    

    this.recipesChangedSubscription.unsubscribe();
  }

}
