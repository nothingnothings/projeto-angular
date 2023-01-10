import { Component, OnInit, Output, EventEmitter } from '@angular/core';


import { Input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {


  // @Input() recipeImagePath: string = '';
  // @Input() recipeName: string = '';
  // @Input() recipeDescription: string = '';

  @Output() recipeDetailEmitter = new EventEmitter<number>()

  @Input() name: string;
  @Input() description: string;
  @Input() imagePath: string;


  constructor() { }





  ngOnInit(): void {
  }


  onRecipeItemClick(index: number) {

      this.recipeDetailEmitter.emit(index)

  }


}
