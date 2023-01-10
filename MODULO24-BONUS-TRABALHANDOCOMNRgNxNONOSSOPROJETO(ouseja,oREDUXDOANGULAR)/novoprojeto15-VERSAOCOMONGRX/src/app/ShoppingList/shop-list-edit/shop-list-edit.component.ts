import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';

// import { ShoppingListService } from 'src/app/shoppingList.service'; ///substituído pelo NGRX...

import * as fromShoppingList from '../store/shoppingList.reducer';

import * as ShoppingListActions from '../store/shoppingListActions';


import { AppState } from 'src/app';

@Component({
  selector: 'app-shop-list-edit',
  templateUrl: './shop-list-edit.component.html',
  styleUrls: ['./shop-list-edit.component.css'],
})
export class ShopListEditComponent implements OnInit, OnDestroy {
  editMode = false;
  editedItemIndex: number; ///essa propriedade é REDUNDANTE...  (ver aula 'removendo component state managemnt redunc)

  editedItem: Ingredient;

  @ViewChild('localFormReference') formReference: NgForm;

  subscription: Subscription;

  constructor(
    // private shoppingListService: ShoppingListService, ///substituído pelo NGRX...

    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((shoppingListState) => {
        if (shoppingListState.selectedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = shoppingListState.selectedIngredient!;
          this.editedItemIndex = shoppingListState.selectedIngredientIndex!;
          this.formReference.form.setValue({
            name: this.editedItem.ingredient,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onFormSubmit(form: NgForm) {
    const yourIngredient = new Ingredient(
      form.value['name'],
      form.value['amount'],
      this.editedItemIndex
    );

    if (this.editMode) {
      console.log(form);

      // this.shoppingListService.editIngredient(
      //   this.editedItemIndex,
      //   yourIngredient
      // );

      this.store.dispatch(new ShoppingListActions.EditIngredient(yourIngredient));

      this.editMode = false;
    } else {
      // this.shoppingListService.onIngredientAdd(yourIngredient);

      this.store.dispatch(new ShoppingListActions.AddIngredient(yourIngredient))
    }

    this.formReference.form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.store.dispatch(new ShoppingListActions.StopEdit());
    this.onClearRecipe();
  }

  onClearRecipe() {
    this.formReference.form.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDeleteRecipe() {

    this.store.dispatch(new ShoppingListActions.RemoveIngredient());
    this.onClearRecipe();
  }
}
