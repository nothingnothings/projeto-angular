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

@Component({
  selector: 'app-shop-list-edit',
  templateUrl: './shop-list-edit.component.html',
  styleUrls: ['./shop-list-edit.component.css'],
})
export class ShopListEditComponent implements OnInit {
  @ViewChild('ingredientName') ingredientName: ElementRef;

  @ViewChild('ingredientAmount') ingredientAmount: ElementRef;

  @Output() ingredientEmitter = new EventEmitter<Ingredient>();

  @Output() deleteIngredientEmitter = new EventEmitter<number>();

  @Input() ingredientToBeRemoved: Ingredient;




  constructor() {}

  ngOnInit(): void {}

  onAddIngredient() {
    console.log(this.ingredientName);
    console.log(this.ingredientAmount);
    const name = this.ingredientName.nativeElement.value;
    const amount = this.ingredientAmount.nativeElement.value;
    const id = Date.now() + Math.random();

    const newIngredient = new Ingredient(name, amount, id);

    this.ingredientEmitter.emit(newIngredient);

  }

  onDeleteIngredient() {
    const ingredientIndex = this.ingredientToBeRemoved.id;
    this.deleteIngredientEmitter.emit(ingredientIndex);
  }
}
