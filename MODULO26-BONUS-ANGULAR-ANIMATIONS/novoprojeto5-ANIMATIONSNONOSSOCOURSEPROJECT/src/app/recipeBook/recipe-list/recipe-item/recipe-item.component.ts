import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;
  @Input() imagePath: string;

  @Input() index: number;

  constructor() {}

  ngOnInit(): void {}
}
