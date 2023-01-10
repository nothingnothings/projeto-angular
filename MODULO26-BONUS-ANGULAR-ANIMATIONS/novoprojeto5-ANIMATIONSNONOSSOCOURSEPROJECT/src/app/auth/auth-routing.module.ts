import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AuthPageComponent } from './auth-page.component';

const authRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: AuthPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
