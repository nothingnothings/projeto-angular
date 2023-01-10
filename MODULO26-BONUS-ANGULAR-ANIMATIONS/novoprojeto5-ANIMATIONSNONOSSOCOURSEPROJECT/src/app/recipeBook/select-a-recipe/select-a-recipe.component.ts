import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-a-recipe',
  templateUrl: './select-a-recipe.component.html',
  styleUrls: ['./select-a-recipe.component.css'],
  animations: [



    trigger('selectRecipe',
    
    

    [



      state(
        'in',


        style(
          {
            'opacity': '1'
          }
        )
      ),




      transition(
        'void => *',

        [
          style(
            {
              'opacity': '0',
            }
          ),

          animate(1000)
        ]
      )
    ]
    
    
    
    )

  ]
})
export class SelectARecipeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
