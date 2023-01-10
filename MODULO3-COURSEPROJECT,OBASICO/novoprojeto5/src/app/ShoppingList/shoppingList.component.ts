import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shoppingList.component.html',
  styleUrls: ['./shoppingList.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [

    new Ingredient('Potato', 1),
    new Ingredient('Tomato', 2),
    new Ingredient('Banana', 5)

  ];

  constructor() {}

  ngOnInit(): void {}
}
