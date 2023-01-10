import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AuthPageComponent } from './auth-page/auth-page.component';

import { RecipeBookComponent } from './recipeBook/recipe-book.component';

const appRoutes: Routes = [
  {
    path: '',
    component: RecipeBookComponent,
  },

  {
    path: 'auth',
    canActivate: [AuthGuardService],
    component: AuthPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
