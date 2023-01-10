import { Component, OnInit } from '@angular/core';


import { Input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {


  @Input() recipeImagePath: string = '';
  @Input() recipeName: string = '';
  @Input() recipeDescription: string = '';



  constructor() { }





  ngOnInit(): void {
  }

}
