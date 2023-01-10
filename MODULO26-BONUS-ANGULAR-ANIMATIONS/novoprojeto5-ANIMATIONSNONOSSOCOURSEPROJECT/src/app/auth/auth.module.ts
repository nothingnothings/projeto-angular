import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthPageComponent } from './auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthPageComponent],

  imports: [FormsModule, SharedModule, AuthRoutingModule, CommonModule],
  exports: [AuthPageComponent, FormsModule],
})
export class AuthModule {}
