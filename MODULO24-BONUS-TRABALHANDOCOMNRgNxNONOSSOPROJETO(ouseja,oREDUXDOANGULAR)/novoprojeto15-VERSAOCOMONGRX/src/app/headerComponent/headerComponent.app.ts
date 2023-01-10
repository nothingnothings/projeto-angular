import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '..';
import { AuthService } from '../auth/auth.service';
// import { EventEmitter } from '@angular/core';
import { RecipeBookService } from '../recipeBook.service';

import * as AuthActions from '../auth/store/authActions';





import * as RecipeBookActions from '../recipeBook/store/recipeBookActions';
import { Recipe } from '../recipeBook/recipe.model';

@Component({
  templateUrl: './headerComponent.app.html',
  styleUrls: ['./headerComponent.app.css'],
  selector: 'app-header-component',
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;

  isAuth: boolean = false;

  userEmitted: Subscription;

  recipesEmitted: Subscription;

  loadedRecipes: Recipe[];
  // @Output() selectedPage = new EventEmitter<string>();

  constructor(
    private recipeService: RecipeBookService,
    // private authService: AuthService,
    private store: Store<AppState>
  ) {}

  // onShopList() {
  //   this.selectedPage.emit('shopList');
  // }

  // onRecipeBook() {
  //   this.selectedPage.emit('recipeBook');
  // }

  ngOnInit(): void {




    // this.userEmitted = this.authService.user.subscribe(  ///VERSÃO SEM O USO DE NGRX
    //   (user) => {
    //     if (user) {
    //         this.isAuth = true;
    //     } else {


    //       const loadedUser = localStorage.getItem('token');

    //       if (loadedUser) {
    //         this.isAuth = true;
    //       } else {

    //         this.isAuth = false;
    //       }
    //     }

    //   }
    // )


    this.recipesEmitted = this.store.select('recipeBook').subscribe(
      (recipeBookData) => {
          

        this.loadedRecipes = recipeBookData.recipes;

      }
    )






    this.userEmitted = this.store.select('auth').subscribe(  ///VERSÃO COM O USO DO NGRX...
    (user) => {
      // if (user) {  ////versão sem NGRX
      if (user.token) {  ///versão com NGRX
          this.isAuth = true;
      } else {


        const loadedUser = localStorage.getItem('token');

        if (loadedUser) {
          this.isAuth = true;
        } else {

          this.isAuth = false;
        }
      }

    }
  )



  }

  onLoadData() {
    console.log('TEST');
    // this.recipeService.loadRecipes().subscribe(
    //   (data) =>  {

    //     console.log(data);

    //   }
    // )



    ///SUBSTITUÍDO PELO NGRX E  NGRX/EFFECTS...
    // this.recipeService.loadRecipes().subscribe(); ////não precisamos da data retornada por esse method, especificamente...
 
    
    this.store.dispatch(new RecipeBookActions.StartFetchRecipes());
 
 
  }

  onSaveData() {
    // this.recipeService.saveRecipes();  ///SUBSTITUÍDO PELO NGRX e NGRX/EFFECTS...



    this.store.dispatch(new RecipeBookActions.SaveRecipesStart());



    // .subscribe( ////podemos deixar esse call lá em 'recipeBook.service.ts'...
    //   (data) => {
    //     console.log('Saved Recipes', data);
    //   }
    // )
  }

  onLogout() {
    // this.authService.logoutUser(); //inutilizado. agora usamos o dispatch de uma action ao nosso store para querer fazer logout (aí usamos effects, a partir desse dispatch, etc)

    this.store.dispatch(new AuthActions.AuthLogout());
  }

  ngOnDestroy(): void {
    this.userEmitted.unsubscribe();
    this.recipesEmitted.unsubscribe();
  }
}
