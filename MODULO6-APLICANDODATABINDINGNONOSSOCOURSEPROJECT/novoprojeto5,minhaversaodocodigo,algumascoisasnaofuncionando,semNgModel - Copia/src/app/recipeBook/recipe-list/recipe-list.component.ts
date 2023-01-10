import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() listItemDetail = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Chicken Wings',
      'Delicious chicken wings',
      'https://www.farmfor.com.br/wp-content/uploads/2022/02/coxinha-da-asa-superbowl.jpg'
    ),
    new Recipe(
      'Pork Chops',
      'Tasty pork chops, check them out',
      'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQsRbNYL4S-Noacb27Vi-sbWzURFRjW9YN8VOScbiJ0DxTAiGxTyqlNdG1TWHKN1xWqOV4UhHaFef-fBD8-PGo'
    ),
    new Recipe(
      'Caesar Salad',
      'Fresh and healthy salad',
      'https://www.confeiteiradesucesso.com/wp-content/uploads/2019/06/ceasarsalad-fb.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecipeItemClick(index: number) {
    console.log('TEST');
    // console.log(index)

    const selectedRecipe: Recipe = this.recipes[index];

    this.listItemDetail.emit(selectedRecipe);
  }
}
