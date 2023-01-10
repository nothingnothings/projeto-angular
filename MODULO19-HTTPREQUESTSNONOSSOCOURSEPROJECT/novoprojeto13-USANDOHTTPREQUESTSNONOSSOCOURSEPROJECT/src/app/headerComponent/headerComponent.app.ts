import { Component, Output } from '@angular/core';
// import { EventEmitter } from '@angular/core';
import { RecipeBookService } from '../recipeBook.service';

@Component({
  templateUrl: './headerComponent.app.html',
  styleUrls: ['./headerComponent.app.css'],
  selector: 'app-header-component',
})
export class HeaderComponent {
  collapsed = true;

  // @Output() selectedPage = new EventEmitter<string>();

  constructor(private recipeService: RecipeBookService) {}

  // onShopList() {
  //   this.selectedPage.emit('shopList');
  // }

  // onRecipeBook() {
  //   this.selectedPage.emit('recipeBook');
  // }








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

    this.recipeService.saveRecipes()
    // .subscribe( ////podemos deixar esse call lá em 'recipeBook.service.ts'...
    //   (data) => {
    //     console.log('Saved Recipes', data);
    //   } 
    // )
  }
}
