import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpInterceptorService } from 'src/app/httpInterceptor.service';
import { RecipeBookService } from 'src/app/recipeBook.service';
import { ShoppingListService } from 'src/app/shoppingList.service';

@NgModule({
  providers: [
    RecipeBookService,
    ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
