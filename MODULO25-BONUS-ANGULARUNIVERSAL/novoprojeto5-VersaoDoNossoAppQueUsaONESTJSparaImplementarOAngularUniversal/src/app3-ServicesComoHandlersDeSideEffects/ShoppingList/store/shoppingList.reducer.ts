// import { Action } from '@ngrx/store'; //transplantado para a file de 'actions'...



import * as ShoppingListActions from './shoppingListActions'; ////nossa collection de POSSÍVEIS ACTIONS/action identifiers...

 /// 'ShoppingListActions.ShoppingListActionTypes' --> isso é EXTREMAMENTE IMPORTANTE (precisamos para definir no type de 'action' que temos no constructor)....

import { Ingredient } from '../../shared/ingredient.model';

import { updateObject } from '../../utility/updateObject'


// import { Action, createReducer, on} from '@ngrx/store';





export interface ShoppingListState {
  ingredients: Ingredient[],
  selectedIngredient: Ingredient | null,
  selectedIngredientIndex: number
}



// export interface AppState { //definimos isso globalmente....
//   shoppingList: ShoppingListState;
// }


// let ingredients: Ingredient[] = [];





// export interface ShoppingListState {
//   ingredients: Ingredient[]
// }

// const initialState = {
//   ////queremos ter esse 'INITIALSTATE' de nosso app, que antes existia lá no SERVICE DE 'shoppingList.service.ts', CONSIDERADO NESSE NOSSO REDUCER/SISTEMA DO CENTRAL STORE...

//   ingredients: ingredients
// };







const initialState: ShoppingListState = {

  ingredients: [new Ingredient('Lettuce', 5, 0.1221412452154)],
  selectedIngredient: null,
  selectedIngredientIndex: -1
}











// ////POR MEIO DA FEATURE typescript (next gen javascript) de 'state = initialState', DEFINIMOS O 'initial state' considerado no nosso reducer _cOMO _ SENDO O MESMO STATE QUE DEFINIMOS LOGO ACIMA, NAQUELA CONST...
// export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
//   ///////ESSES 2 ARGUMENTOS SÃO SEMPRE 'PASSED IN' pelo próprio angular 'NGRX', contanto que vocÊ defina esse reducer como REDUCER DE SEU APP

//   ///state --> é o APPLICATION-WIDE STATE DE SEU APP...

//   switch (action.type) {
//     // case 'INGREDIENT_ADD':
    // case ShoppingListActions.ADD_INGREDIENT:
    //   // return addIngredient(state, action);
    //   // return state;

    //   return {
    //     ...state,
    //     ingredients: [
    //       ...state.ingredients,
    //       action.payload

    //     ]
    //   }
    // break;
    // case ShoppingListActions.DELETE_INGREDIENT:
    //   return state;
    //   break;
    // case ShoppingListActions.EDIT_INGREDIENT:
    //   return state;
    //     break;
    //   default: ////é o case do INITIALIZE DE NOSSO STATE (pq no início de nosso app, será definido/passado o 'initialState', sem o pass de nenhuma actionType...) --> e é aí que entra em jogo esse return de 'state' como o DEFAULT, pq isso significa que nosso state NÃO TERÁ SIDO ALTERADO POR ACTION NENHUMA, MAS QUE AINDA SERÁ 'returned', pq isso será necessário...
    //     return state;  

  
//   }
// }




export function shoppingListReducer(state: ShoppingListState = initialState, 
  // action: ShoppingListActions.AddIngredient  //maneira errada (vai pegar o type de SÓ UMA DAS ACTIONS)
  action: ShoppingListActions.ShoppingListActionTypes
  
  ): ShoppingListState {
  switch(action.type){
    case ShoppingListActions.ADD_INGREDIENT:
      // return addIngredient(state, action);
      // return state;

      // return {
      //   ...state,
      //   ingredients: [
      //     ...state.ingredients,
      //     action.payload
      //   ]
      // }
      return addIngredient(state, action as ShoppingListActions.AddIngredient);
      break;
    case ShoppingListActions.ADD_INGREDIENTS:
      return addIngredients(state, action as ShoppingListActions.AddIngredients);
      break;
    case ShoppingListActions.DELETE_INGREDIENT:
      return removeIngredient(state, action as ShoppingListActions.RemoveIngredient);
      break;
    case ShoppingListActions.EDIT_INGREDIENT:
      return editIngredient(state, action as ShoppingListActions.EditIngredient);
        break;
    case ShoppingListActions.START_EDIT:
      return startEdit(state, action as ShoppingListActions.StartEdit);
      break;
    case ShoppingListActions.STOP_EDIT:
      return stopEdit(state, action as ShoppingListActions.StopEdit);
      break;
    default: ////é o case do INITIALIZE DE NOSSO STATE (pq no início de nosso app, será definido/passado o 'initialState', sem o pass de nenhuma actionType...) --> e é aí que entra em jogo esse return de 'state' como o DEFAULT, pq isso significa que nosso state NÃO TERÁ SIDO ALTERADO POR ACTION NENHUMA, MAS QUE AINDA SERÁ 'returned', pq isso será necessário...
      return state;  
  }
  }


// const reducer = createReducer(  ////o uso de 'on' é equivalente a um SWITCH CASE STATEMENT...
//   initialState,



//   on(shoppingListActions.AddIngredient,
    
//     (state, action) => {

//       return [...state, action.payload]
//     }
    
//     )





// )




// export function ShoppingListReducer(state: Array<Ingredient> | undefined, action: Action) {

//   return reducer(state, action);
// }















// const addIngredient = (state: {ingredients: Ingredient[]}, action: {type: string, ingredient: Ingredient}) => {

//     const updatedIngredients = {
//         ...state.ingredients
//     }


//     updatedIngredients.push(action.ingredient)


//     return updateObject(state, {

//         ingredients: updatedIngredients

//     })


// }





  const addIngredient = (state: ShoppingListState, 
    // action: ShoppingListActions.AddIngredient
    // action: ShoppingListActions.AddIngredient
    action: ShoppingListActions.AddIngredient
    ): ShoppingListState => {

  const updatedIngredients = [
      ...state.ingredients
  ]


  // updatedIngredients.push(action.payload);



    updatedIngredients.push(action.payload);
  
  

  // return {
  //   ...state,
  //   ingredients: updatedIngredients
  // }



  return updateObject(state, {ingredients: updatedIngredients})

}





const addIngredients = (state: ShoppingListState, action: ShoppingListActions.AddIngredients): ShoppingListState => {


  const updatedIngredients = [
    ...state.ingredients
  ]


    
    updatedIngredients.push(...action.payload);







  return updateObject(state, {ingredients: updatedIngredients});

}











const removeIngredient = (state: ShoppingListState, action: ShoppingListActions.RemoveIngredient): ShoppingListState => {

  const updatedIngredients = [
    ...state.ingredients
  ]




  // updatedIngredients.splice(action.payload, 1);
  updatedIngredients.splice(state.selectedIngredientIndex, 1);
 

  return updateObject(state, { ingredients: updatedIngredients, selectedIngredient: null, selectedIngredientIndex: -1})


}





const editIngredient = (state: ShoppingListState, action: ShoppingListActions.EditIngredient): ShoppingListState => {


  const updatedIngredients = [
    ...state.ingredients
  ]




//  const ingredientIndex = updatedIngredients.findIndex(
//     (ingredient) => {
//         return ingredient.recipeIndex === action.payload.index
//     }
//   );


  // updatedIngredients[action.payload.index] = action.payload.ingredient;
  updatedIngredients[state.selectedIngredientIndex] = action.payload


  return updateObject(state, {ingredients: updatedIngredients, selectedIngredient: null, selectedIngredientIndex: -1});

}




const startEdit = (state: ShoppingListState, action: ShoppingListActions.StartEdit): ShoppingListState => {

  const updatedState = {
    ...state
  }


  const ingredient = state.ingredients.find(
    (ingredient, index) => {
          return index === action.payload;
    }
  );


  if (!ingredient) {
    alert('Invalid Input, please try again.')
    return state;
  }




  
  return updateObject(updatedState, {selectedIngredient: ingredient, selectedIngredientIndex: action.payload})

}



const stopEdit = (state: ShoppingListState, action: ShoppingListActions.StopEdit): ShoppingListState => {





  const updatedState = {
    ...state
  }

  
  return updateObject(updatedState, {selectedIngredient: null, selectedIngredientIndex: -1})

}



// ////POR MEIO DA FEATURE typescript (next gen javascript) de 'state = initialState', DEFINIMOS O 'initial state' considerado no nosso reducer _cOMO _ SENDO O MESMO STATE QUE DEFINIMOS LOGO ACIMA, NAQUELA CONST...
// export function shoppingListReducer(state = initialState, action: any) {
//   ///////ESSES 2 ARGUMENTOS SÃO SEMPRE 'PASSED IN' pelo próprio angular 'NGRX', contanto que vocÊ defina esse reducer como REDUCER DE SEU APP

//   ///state --> é o APPLICATION-WIDE STATE DE SEU APP...

//   switch (action.type) {
//     // case 'INGREDIENT_ADD':
//     case ActionIdentifiers.ADD_INGREDIENT:
//       return addIngredient(state, action);
//     break;
//     case ActionIdentifiers.DELETE_INGREDIENT:
//       break;
//     case ActionIdentifiers.EDIT_INGREDIENT:

  
//   }
// }






