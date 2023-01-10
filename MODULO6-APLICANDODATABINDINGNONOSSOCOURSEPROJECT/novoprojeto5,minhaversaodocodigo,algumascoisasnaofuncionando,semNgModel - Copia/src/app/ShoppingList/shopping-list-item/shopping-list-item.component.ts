import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit {


 @Input() name: string;
 @Input() amount: number;

  constructor() { }

  ngOnInit(): void {
  }

}
