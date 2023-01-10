import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shoppingList.component';

const shoppingListRoutes: Routes = [
  // {
  //   path: 'shop-list',
  //   component: ShoppingListComponent
  // },



  {
    path: '',
    component: ShoppingListComponent
  },
];

@NgModule({
  // imports: [RouterModule.forChild(shoppingListRoutes)],
  imports: [RouterModule.forChild(shoppingListRoutes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
