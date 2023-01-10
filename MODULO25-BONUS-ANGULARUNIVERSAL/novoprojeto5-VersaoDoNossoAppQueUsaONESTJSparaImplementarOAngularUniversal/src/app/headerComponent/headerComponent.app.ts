import { Component, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '..';

import { Inject } from '@angular/core';

import { RecipeBookService } from '../recipeBook.service';

import * as AuthActions from '../auth/store/authActions';

import * as RecipeBookActions from '../recipeBook/store/recipeBookActions';
import { Recipe } from '../recipeBook/recipe.model';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(
    private recipeService: RecipeBookService,

    private store: Store<AppState>,

    @Inject(PLATFORM_ID) private platformId  ///EIS O CÓDIGO EM QUESTÃO.
  ) {}

  ngOnInit(): void {
    this.recipesEmitted = this.store
      .select('recipeBook')
      .subscribe((recipeBookData) => {
        this.loadedRecipes = recipeBookData.recipes;
      });


    


      if (isPlatformBrowser(this.platformId)) {

        this.userEmitted = this.store.select('auth').subscribe((user) => {
          if (user.token) {
            this.isAuth = true;
          } else {
    
      
            const loadedUser = localStorage.getItem('token');
    
            if (loadedUser) {
              this.isAuth = true;
            } else {
              this.isAuth = false;
            }
          }
        });


      }

    // this.userEmitted = this.store.select('auth').subscribe((user) => {
    //   if (user.token) {
    //     this.isAuth = true;
    //   } else {

  
    //     const loadedUser = localStorage.getItem('token');

    //     if (loadedUser) {
    //       this.isAuth = true;
    //     } else {
    //       this.isAuth = false;
    //     }
    //   }
    // });
  }

  onLoadData() {
    console.log('TEST');

    this.store.dispatch(new RecipeBookActions.StartFetchRecipes());
  }

  onSaveData() {
    this.store.dispatch(new RecipeBookActions.SaveRecipesStart());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.AuthLogout());
  }

  ngOnDestroy(): void {


    if (isPlatformBrowser(this.platformId)) {
      this.userEmitted.unsubscribe();
    }
 
    this.recipesEmitted.unsubscribe();
  }
}
