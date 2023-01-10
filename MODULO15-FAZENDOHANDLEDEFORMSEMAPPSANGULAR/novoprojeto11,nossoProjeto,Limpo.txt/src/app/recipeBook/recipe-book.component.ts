import { Component, OnInit, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { RecipeBookService } from '../recipeBook.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
