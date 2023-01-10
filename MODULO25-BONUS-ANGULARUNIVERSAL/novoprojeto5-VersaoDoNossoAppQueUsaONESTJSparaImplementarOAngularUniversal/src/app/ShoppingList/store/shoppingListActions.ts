import { Action } from '@ngrx/store'; ///precisamos disso para DESCREVER NOSSAS ACTIONS...
import { Ingredient } from 'src/app/shared/ingredient.model';

// import { createAction, props } from '@ngrx/store';

 
export const GET_INGREDIENT = '[Shopping List] INGREDIENT_GET';

export const ADD_INGREDIENT = '[Shopping List] INGREDIENT_ADD'; ////identifiers de nossas actions

export const ADD_INGREDIENTS = '[Shopping List] INGREDIENTS_ADD';

export const EDIT_INGREDIENT = '[Shopping List] INGREDIENT_EDIT';

export const DELETE_INGREDIENT = '[Shopping List] INGREDIENT_DELETE';


export const START_EDIT = '[Shopping List] START_EDIT';



export const STOP_EDIT = '[Shopping List] STOP_EDIT';

export class AddIngredient implements Action { 
  readonly type: string = ADD_INGREDIENT; ///precisa ser adicionada a essa class typescript.. (feature própria do typescript)...

// payload?: Ingredient ///é opcional, o payload é opcional...  --> e essa escrita é RUIM... escreva com o CONSTRUCTOR, É MELHOR..



constructor(public payload: Ingredient) {}


}



// export const AddIngredient = createAction(
//   ADD_INGREDIENT,
//   props<{payload: Ingredient}>()
// )




export class AddIngredients implements Action {


  readonly type: string = ADD_INGREDIENTS; 




constructor(public payload: Ingredient[]) {}



}




export class RemoveIngredient implements Action {

    readonly type: string = DELETE_INGREDIENT;



    // constructor(public payload: number) {}

    constructor() {}
}



export class EditIngredient implements Action {

  readonly type: string = EDIT_INGREDIENT;



  // constructor(public payload: {ingredient: Ingredient, index: number}) {}


  constructor(public payload: Ingredient) {}
}





export class StartEdit implements Action {

  readonly type: string = START_EDIT;


  constructor (public payload: number) {}


}





export class StopEdit implements Action { ///resetta o 'selectedIngredient' e 'selectedIngredientIndex' aos seus values iniciais (null)...

  readonly type: string = STOP_EDIT;




}







/////ISTO É EXTREMAMENTE IMPORTANTE: ESSE 'TYPE', UNION TYPE (com todas as actions SUPORTADAS POR SEU REDUCER) deve ser usado lá no seu reducer, em 'action: ShoppingListActions.ShoppingListActionTypes'


export type ShoppingListActionTypes = AddIngredient | 
                                     AddIngredients | 
                                     EditIngredient | 
                                     RemoveIngredient |
                                     StartEdit |
                                     StopEdit



