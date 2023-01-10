import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
// import { EventEmitter } from '@angular/core';
import { RecipeBookService } from '../recipeBook.service';

@Component({
  templateUrl: './headerComponent.app.html',
  styleUrls: ['./headerComponent.app.css'],
  selector: 'app-header-component',
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;

  isAuth: boolean = false;

  userEmitted: Subscription;
  // @Output() selectedPage = new EventEmitter<string>();

  constructor(
    private recipeService: RecipeBookService,
    private authService: AuthService
  ) {}

  // onShopList() {
  //   this.selectedPage.emit('shopList');
  // }

  // onRecipeBook() {
  //   this.selectedPage.emit('recipeBook');
  // }

  ngOnInit(): void {




    this.userEmitted = this.authService.user.subscribe(
      (user) => {
        if (user) {
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

    this.recipeService.loadRecipes().subscribe(); ////não precisamos da data retornada por esse method, especificamente...
  }

  onSaveData() {
    this.recipeService.saveRecipes();
    // .subscribe( ////podemos deixar esse call lá em 'recipeBook.service.ts'...
    //   (data) => {
    //     console.log('Saved Recipes', data);
    //   }
    // )
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
    this.userEmitted.unsubscribe();
  }
}
