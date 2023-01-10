import { Component, OnDestroy, OnInit } from '@angular/core';



import { Store } from '@ngrx/store';  ///É ASSIM QUE ACESSAMOS NOSSO 'GLOBAL STORE' do app, do NGRX ( e nós vamos INJETAR ESSE TYPE/store, como se fosse um service, para aí conseguirmos acessar o STATE da shoppingList, dos Ingredient, nesse nosso component de 'shoppingList'...)




import {  Observable, Subscription } from 'rxjs';
// import { AppState } from '..';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shoppingList.service';  ///substituído pelo NGRX...
// import { ShoppingListState } from './store/shoppingList.reducer';

import * as ShoppingListActions from './store/shoppingListActions';

import * as fromShoppingList from './store/shoppingList.reducer';




import { AppState } from '..';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shoppingList.component.html',
  styleUrls: ['./shoppingList.component.css'],
})
export class ShoppingListComponent implements OnInit {
  // ingredients: Ingredient[] = [];  ///tiramos, pq agora vamos depender do OBSERVABLE do 'ngrx', observable que é disparado QUANDO OCORRER UMA TROCA DE STATE NO STATE DE 'shoppingList'...

  ingredients: Observable<{ingredients: Ingredient[]}>  ///no final das contas, vai retornar um OBJECT com uma propriedade 'ingredients', que vai segurar um ARRAY DE 'Ingredient'..
    ///não precisamos usar 'ngOnDestroy()' para destruir essa subscription ao trocar de page, pq isso já acontece automaticamente....

  constructor(
    // private shoppingListService: ShoppingListService,
    private loggingService: LoggingService,
    // private store: Store<  ///é a mesma coisa que o código de baixo de 'store', mas o código de baixo IMPORTA ESSA INTERFACE, que está outsourceada lá em 'shoppingList.reducer.ts'...
    // {shoppingList: {ingredients: Ingredient[], selectedIngredient: Ingredient}    }           ///dentro da marcação do generic type, descreva o FORMATO DA DATA QUE SERÁ RETORNADA POR SEU REDUCER (cheque o 'initialState' do reducer, e os types das propriedades)...
    
    // >               
    // private store: Store<{shoppingList: ShoppingListState}>
    // private store: Store<AppState>  ///é suboptimal, pq vai importar mt coisa desnecessária (As outras partes do state/outros reducers)....


    private store: Store<AppState> ///sintaxe final.

  ) {}

  ngOnInit(): void {

    // this.ingredients = this.shoppingListService.getIngredients(); //////CÓDIGO INUTILIZADO POR CONTA DO USO DO STORE, USO DO _ STATE_ DO 'GLOBAL STORE' do ngrx...

    // this.ingredientsChangedSubscription =
    //   this.shoppingListService.ingredientsChanged.subscribe((ingredients) => {
    //     this.ingredients = ingredients;
    //   });


    // this.store.select()  //esse é um method MT IMPORTANTE, que existe dentro do store...
  ///as 'slices' de nosso state são identificadas POR STRINGS... (e para que aparecam como strings, vocÊ deve escrever naquele '''private store: Store<{}>''', dentro da generic type definition...)
  

   this.ingredients = this.store.select('shoppingList');
  
  
  }

  // onShoplistItemClick(index: number) {    ////sem o uso de NGRX...
  //   this.shoppingListService.loadShopListItem(index);
  // }


  onShopListItemClick(index: number) {

    // this.shoppingListService.onIngredientClicked(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));



  }



}
