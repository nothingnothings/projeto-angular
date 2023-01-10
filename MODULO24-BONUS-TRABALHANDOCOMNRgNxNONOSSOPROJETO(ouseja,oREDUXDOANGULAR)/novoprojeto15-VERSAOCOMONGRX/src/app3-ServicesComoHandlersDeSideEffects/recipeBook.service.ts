import {
  ComponentFactoryResolver,
  EventEmitter, ///TROCAMOS POR 'SUBJECT', que é simplesmente MELHOR como CROSS-COMPONENT COMMUNICATION TOOL....
  Injectable,
  Output,
} from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { exhaustMap, map, Subject, 
  take,  ////'''VOU QUERER PEGAR APENAS 1 VALUE DESSE OBSERVABLE AÍ, E AÍ VOU QUERER FAZER UNSUBSCRIBE IMEDIATAMENTE DEPOIS''''
  
  
  tap } from 'rxjs';
import { Recipe } from './recipeBook/recipe.model';
import { Ingredient } from './shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';
// import { AuthService } from './auth/auth.service';

import * as ShoppingListActions from './ShoppingList/store/shoppingListActions';
import * as fromShoppingList from '../app/ShoppingList/store/shoppingList.reducer';
import { Store } from '@ngrx/store';

import { AppState } from '.';

@Injectable()
export class RecipeBookService {
  private recipes: Recipe[] = [
    //professor colocou como PRIVATE....
    // new Recipe(
    //   'Chicken Wings',
    //   'Delicious chicken wings',
    //   'https://www.farmfor.com.br/wp-content/uploads/2022/02/coxinha-da-asa-superbowl.jpg',
    //   [
    //     new Ingredient('Potato', 1, 0),
    //     new Ingredient('Tomato', 2, 0),
    //     new Ingredient('Banana', 5, 0),
    //   ],
    //   0
    // ),
    // new Recipe(
    //   'Pork Chops',
    //   'Tasty pork chops, check them out',
    //   'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQsRbNYL4S-Noacb27Vi-sbWzURFRjW9YN8VOScbiJ0DxTAiGxTyqlNdG1TWHKN1xWqOV4UhHaFef-fBD8-PGo',
    //   [
    //     new Ingredient('Lettuce', 5, 1),
    //     new Ingredient('Apple', 4, 1),
    //     new Ingredient('Banana', 1, 1),
    //   ],
    //   1
    // ),
    // new Recipe(
    //   'Caesar Salad',
    //   'Fresh and healthy salad',
    //   'https://www.confeiteiradesucesso.com/wp-content/uploads/2019/06/ceasarsalad-fb.jpg',
    //   [
    //     new Ingredient('Pumpkin', 3, 2),
    //     new Ingredient('Meat', 9,  2),
    //     new Ingredient('Avocado', 4, 2),
    //   ],
    //   2
    // ),
  ];

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient,
    // private store: Store<{shoppingList: {ingredients: Ingredient[]}}>  /////isso pq agora vamos VINCULAR A NOSSA 'STORE' (que é o nosso SOURCE OF TRUTH, AGORA; é o nosso STATE CENTRAL, em outras palavras) A ESSE SERVICE AÍ...
///declaramos o 'formato que nosso slice de state relativo a 'shoppingList' terá....

private store: Store<AppState>
  ) {}

  getRecipes() {
    return [...this.recipes];
  }


















  loadRecipes() { /////OBS::: A LÓGICA DE 'ADD O USER TOKEN A ESSE HTTP REQUEST' foi colocada lá no 'httpInterceptor.service.ts' (que adiciona esse token a todo e qualquer request disparado por nosso app, que sai de nosso app)....


    const requestHeaders = new HttpHeaders();



return this.http   ///este código NÃO PODE SER colocado dentro daquele '.subscribe()' do call de this.authService.user... (o nesting de observables é IMPOSSÍVEL)...
      .get<{ [name: string]: Recipe }>(
        // 'https://recipebookdummyproject-default-rtdb.firebaseio.com/recipes.json' ///VERSÃO DUMMY, SEM AUTHENTICATE RULES NO FIREBASE API
        'https://recipebookdeployproject-default-rtdb.firebaseio.com/recipes.json', //VERSÃO DEPLOY, com o uso de AUTHENTICATE RULES no firebase api (restrição de acesso a contas com email)...
      
        {
          headers: requestHeaders
        }

      ).pipe(
        map(
          (data) => {
            const transformedRecipesArray: Recipe[] = [];
  
  
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                transformedRecipesArray.push({ ...data[key] });
              }
            }
  
            transformedRecipesArray.map((recipe) => {  
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],   ////////SE NOSSA PROPRIEDADE 'ingredients' dessa recipe específica NÃO EXISTIR (um bug possível), VAMOS QUERER QUE OS INGREDIENTS SEJAM SETTADOS COMO UM EMPTY ARRAY....
              };
            });
            return transformedRecipesArray;
          }
        ),
        tap(
          (recipes) => {
            this.recipes = recipes;
            this.recipeItemsChanged.next([...recipes]);
          }
        )
        )
  }









  // loadRecipes() {    /////A LÓGICA DO 'ADD DO USERTOKEN' foi outsourceada lá no nosso interceptor de 'httpInterceptor.service.ts', que faz o add de esse token a TODOS OS HTTP REQUESTS QUE SAEM DE NOSSO APP...


  //   // const requestHeaders = new HttpHeaders();





  //  return this.authService.user.pipe(  ///pipeline --> 1) take  2) exhaustMap  3) map 4) tap
  //     ///vamos pegar só 1 único user, 'on demand', e não vamos ficar pegando users constantemente...
  //     take(1)  ////'''VOU QUERER PEGAR APENAS 1 VALUE DESSE OBSERVABLE AÍ, E AÍ VOU QUERER FAZER UNSUBSCRIBE IMEDIATAMENTE DEPOIS''''
  //     ,
  //     exhaustMap( ///o 'exhaustMap' vai nos deixar 'SUBSTITUIR ESSE OBSERVABLE DE "user"' por esse observable que fazemos return dentro de 'exhaustMap()'..  --> o observable de 'user', portanto, deixará de ser de 'user', e sim será um observable de HTTP REQUEST (pq estamos fazendo GET DE RECIPE DATA LÁ DO BACKEND, com essa lógica toda... só usamos o observable de 'user', aquele 'behavior Subject', pq PRECISÁVAMOS DA 'idToken' do user para authenticate o nosso http request......)
  //       (userOnDemand) => {///vamos usar a data do primeiro observable nesse segundo observable...




          
  //         const authRequestParams = new HttpParams().set('auth', userOnDemand?.token!).set('recipeBy', userOnDemand?.id!);
  //         console.log(authRequestParams);

  //     // authRequestParams.append('auth', userOnDemand?.token!); //// ESSA SINTAXE NÃO FUNCIONA, SÓ FUNCIONA COM HEADERS...
  //     // authRequestParams.append('recipeBy', userOnDemand?.id!);


  //     // console.log(authRequestParams);


  //         return this.http.get<Recipe[]>(
  //           'https://recipebookdeployproject-default-rtdb.firebaseio.com/recipes.json',
  //           {
  //             params: authRequestParams
  //           }
  //         )

  //       }


  //     ),

  //     map(
        // (data) => {
        //   const transformedRecipesArray: Recipe[] = [];


        //   for (const key in data) {
        //     if (data.hasOwnProperty(key)) {
        //       transformedRecipesArray.push({ ...data[key] });
        //     }
        //   }

        //   transformedRecipesArray.map((recipe) => {  
        //     return {
        //       ...recipe,
        //       ingredients: recipe.ingredients ? recipe.ingredients : [],   ////////SE NOSSA PROPRIEDADE 'ingredients' dessa recipe específica NÃO EXISTIR (um bug possível), VAMOS QUERER QUE OS INGREDIENTS SEJAM SETTADOS COMO UM EMPTY ARRAY....
        //     };
        //   });
        //   return transformedRecipesArray;
        // }
  //     )
  //     ,
  //     tap(
  //       (recipes) => {
  //         this.recipes = recipes;
  //         this.recipeItemsChanged.next([...recipes]);
  //       }
  //     )
  //  )


  //   // requestHeaders.append('Content-Type', 'application/json');
  //   // requestHeaders.append('Authorization', xxx);
  



  //   // return this.http   ///este código NÃO PODE SER colocado dentro daquele '.subscribe()' do call de this.authService.user... (o nesting de observables é IMPOSSÍVEL)...
  //   //   .get<{ [name: string]: Recipe }>(
  //   //     // 'https://recipebookdummyproject-default-rtdb.firebaseio.com/recipes.json' ///VERSÃO DUMMY, SEM AUTHENTICATE RULES NO FIREBASE API
  //   //     'https://recipebookdeployproject-default-rtdb.firebaseio.com/recipes.json', //VERSÃO DEPLOY, com o uso de AUTHENTICATE RULES no firebase api (restrição de acesso a contas com email)...
      
  //   //     {
  //   //       headers: requestHeaders
  //   //     }
      
  //   //     )
  //   //   .pipe(
  //   //     map((data) => {
  //   //       const transformedRecipesArray: Recipe[] = [];

  //   //       console.log(data);

  //         // for (const key in data) {
  //         //   if (data.hasOwnProperty(key)) {
  //         //     transformedRecipesArray.push({ ...data[key] });
  //         //   }
  //         // }

  //         // transformedRecipesArray.map((recipe) => {  
  //         //   return {
  //         //     ...recipe,
  //         //     ingredients: recipe.ingredients ? recipe.ingredients : [],   ////////SE NOSSA PROPRIEDADE 'ingredients' dessa recipe específica NÃO EXISTIR (um bug possível), VAMOS QUERER QUE OS INGREDIENTS SEJAM SETTADOS COMO UM EMPTY ARRAY....
  //         //   };
  //         // });

  //   //       return transformedRecipesArray;
  //   //     })

  //   //     ,tap(
  //   //       (recipes) => {
  //   //         console.log('TEST')
  //           // this.recipes = recipes;
  //           // this.recipeItemsChanged.next([...recipes]);
  //   //       }
  //   //     )
  //   //   )
  //     // .subscribe((recipes) => { ///movido lá para 'header.component.ts'...
  //     //   this.recipes = recipes;
  //     //   this.recipes = recipes;

  //     //   this.recipeItemsChanged.next([...recipes]);
  //     // });
  // }







  saveRecipes() {
    console.log('SAVED');

    return this.http
      .put( //////a url de cima é a versão DE DUMMY DO NOSSO PROJETO, SEM AUTHENTICATION RULES NO FIREBASE API..
        // 'https://recipebookdummyproject-default-rtdb.firebaseio.com/recipes.json', ////será um request de PUT, e não de 'POST'... --> ISSO PQ QUEREMOS SEMPRE OVERWRITTAR O VALUE ANTIGO DE 'recipes' com o nosso NOVO value...
        'https://recipebookdeployproject-default-rtdb.firebaseio.com/recipes.json', //VERSÃO DEPLOY, com o uso de AUTHENTICATE RULES no firebase api (restrição de acesso a contas com email)...
        this.recipes
      )




      .subscribe((response) => {
        console.log(response);
      });
  }






                ////////ESSA LÓGICA TODA DE 'ADD idToken AOS REQUEST PARAMS DO APP/BROWSER''' foi outsourceada AO ARQUIVO/interceptor de 'httpInterceptor.service.ts'...
  // saveRecipes() {    ////versão com o add de nossa userToken necessária para o authentication, mas com repetição de código em relaçaõ ao 'fetchRecipes'...
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap(
  //       (userOnDemand) => {
  //         return this.http
  //         .put( //////a url de cima é a versão DE DUMMY DO NOSSO PROJETO, SEM AUTHENTICATION RULES NO FIREBASE API..
  //           // 'https://recipebookdummyproject-default-rtdb.firebaseio.com/recipes.json', ////será um request de PUT, e não de 'POST'... --> ISSO PQ QUEREMOS SEMPRE OVERWRITTAR O VALUE ANTIGO DE 'recipes' com o nosso NOVO value...
  //           'https://recipebookdeployproject-default-rtdb.firebaseio.com/recipes.json', //VERSÃO DEPLOY, com o uso de AUTHENTICATE RULES no firebase api (restrição de acesso a contas com email)...
  //           this.recipes,

  //           {
  //             params: new HttpParams().set('auth', userOnDemand?.token!).set('recipeBy', userOnDemand?.id!)
  //           }
  //         )})
  //   ).subscribe(
  //     (response) => {
  //       console.log(response);

  //     }
  //   )

  // }




















  // recipeItemClickedEmitter = new EventEmitter<Recipe>();

  recipeItemClickedEmitter = new Subject<Recipe>();

  recipeItemsChanged = new Subject<Recipe[]>();

  // loadedRecipe: Recipe;

  // recipeItemClicked(index: number) {

  //   const recipe = this.recipes[index];
  //   // this.recipeItemClickedEmitter.emit(recipe);

  //   this.recipeItemClickedEmitter.next(recipe);
  // }












  // sendToShopList(ingredients: Ingredient[]) {
  //   for (let ingredient of ingredients) {
  //     ////minha versão do código --> downside: mtos events disparados, mas não há problema..
  //     this.shoppingListService.onIngredientAdd(ingredient);
  //     console.log('SENT');
  //   }

  //   ////after that, sends the user to the 'shoppingList' page...
  // }






  sendToShopList(ingredients: Ingredient[]) {

    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }




  getRecipe(id: number): Recipe {
    // return this.recipes[id];

    const selectedRecipe = this.recipes.find((recipe) => {
      return recipe.id === id;
    })!;
    return selectedRecipe;
  }

  editRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
  }

  onRecipeEdited(editedRecipe: Recipe, index: number) {
    // this.recipes[index] = editedRecipe;

   const recipeIndex =  this.recipes.findIndex(
      (recipe) => {
        return recipe.id === index;
      }
    )

    this.recipes[recipeIndex] = editedRecipe;


    console.log(this.recipes);

    this.recipeItemsChanged.next([...this.recipes]);
  }

  onRecipeAdded(newRecipe: Recipe) {
    this.recipes.push(newRecipe);

    this.recipeItemsChanged.next([...this.recipes]);
  }

  onRecipeDeleted(index: number) {
    this.recipes.splice(index, 1);
    this.recipeItemsChanged.next([...this.recipes]);
  }
}
