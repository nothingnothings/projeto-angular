// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoggingService } from '../logging.service';
import { SharedModule } from '../shared/shared.module';
// import { RouterModule } from '@angular/router';
import { ShopListEditComponent } from './shop-list-edit/shop-list-edit.component';
import { ShoppingListItemComponent } from './shopping-list-item/shopping-list-item.component';
import { ShoppingListRoutingModule } from './shoppingList-routing.module';
import { ShoppingListComponent } from './shoppingList.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListItemComponent,
    ShopListEditComponent,
  ],
  providers: [
    LoggingService  ///ver aula 'carregando services de forma diferente'.... esse é um dummy module...
  ],
  imports: [
    // CommonModule, 
    FormsModule, 
    ShoppingListRoutingModule,
    SharedModule/// isso deve ser importado aqui e TAMBÉM EM 'app.module.ts'....
  
  ]



})
export class ShoppingListModule {}
