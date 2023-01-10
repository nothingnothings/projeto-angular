
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
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from 'src/app/shoppingList.service';

@Component({
  selector: 'app-shop-list-edit',
  templateUrl: './shop-list-edit.component.html',
  styleUrls: ['./shop-list-edit.component.css'],
})
export class ShopListEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  // @Output() ingredientAdded = new EventEmitter<{
  //   name: string;
  //   amount: number;
  // }>();

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  
editMode = false;
editedItemIndex: number;

editedItem: Ingredient;




@ViewChild('localFormReference') formReference: NgForm;




ingredientSelectedSubscription: Subscription;




  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {



   this.ingredientSelectedSubscription = this.shoppingListService.ingredientSelected.subscribe(
      // (ingredient) => {
      //     this.formReference.form.setValue(
      //       {
      //         'name': ingredient.name,
      //         'amount': ingredient.amount
      //       }
      //     )
      // }
      (index: number) => {
            this.editedItemIndex = index;
            this.editMode = true; //teremos entrado no modo de edit, e logo abaixo, com essa subscription, carregamos a data do shop list item que foi clicado...


            this.editedItem = this.shoppingListService.getIngredient(index);


            this.formReference.form.setValue(
              {
                'name': this.editedItem.ingredient,
                'amount': this.editedItem.amount
              }
            )
    } 
    )

  }

  // onAddItem() {
  //   const newIngredient = new Ingredient(
  //     this.nameInputRef.nativeElement.value,
  //     this.amountInputRef.nativeElement.value
  //   );

  //     this.shoppingListService.onIngredientAdd(newIngredient);
  //     // console.log(this.shoppingListService.getIngredients());


  //   // this.ingredientAdded.emit(newIngredient);
  // }






  onFormSubmit(form: NgForm) {
    console.log(form);
    const yourIngredient = new Ingredient(
      // this.nameInputRef.nativeElement.value,
      // this.amountInputRef.nativeElement.value
      form.value['name'],
      form.value['amount'],
      this.editedItemIndex


    );


    if (this.editMode) {
      console.log(form);

      this.shoppingListService.editIngredient(this.editedItemIndex, yourIngredient);
      this.editMode = false;
   
    } else {

      this.shoppingListService.onIngredientAdd(yourIngredient);
   
    }

    this.formReference.form.reset();
  }



  ngOnDestroy(): void {
    this.ingredientSelectedSubscription.unsubscribe();
  }


  onClearRecipe() {
      this.formReference.form.reset();
      this.editMode = false;
  }


  onDeleteRecipe() {
    
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClearRecipe();
      // this.formReference.form.reset();
      // this.editMode = false;
  }


}
