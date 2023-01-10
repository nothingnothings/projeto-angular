import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from 'src/app/shoppingList.service';

@Component({
  selector: 'app-shop-list-edit',
  templateUrl: './shop-list-edit.component.html',
  styleUrls: ['./shop-list-edit.component.css'],
})
export class ShopListEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  // @Output() ingredientAdded = new EventEmitter<{
  //   name: string;
  //   amount: number;
  // }>();

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {

  }

  onAddItem() {
    const newIngredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value
    );

      this.shoppingListService.onIngredientAdd(newIngredient);
      // console.log(this.shoppingListService.getIngredients());


    // this.ingredientAdded.emit(newIngredient);
  }
}
