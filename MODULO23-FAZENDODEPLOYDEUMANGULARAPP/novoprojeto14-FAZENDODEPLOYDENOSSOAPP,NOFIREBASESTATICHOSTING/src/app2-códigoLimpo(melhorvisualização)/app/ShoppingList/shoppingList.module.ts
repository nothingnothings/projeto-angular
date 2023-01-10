import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

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
  imports: [FormsModule, ShoppingListRoutingModule, SharedModule],
})
export class ShoppingListModule {}
