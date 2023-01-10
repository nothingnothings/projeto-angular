import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  templateUrl: './headerComponent.app.html',
  styleUrls: ['./headerComponent.app.css'],
  selector: 'app-header-component',
})
export class HeaderComponent {
  collapsed = true;

  @Output() selectedPage = new EventEmitter<string>();

  constructor() {}

  onShopList() {
    this.selectedPage.emit('shopList');
  }

  onRecipeBook() {
    this.selectedPage.emit('recipeBook');
  }
}
