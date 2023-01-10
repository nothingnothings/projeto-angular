import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';

import * as ShoppingListActions from './store/shoppingListActions';

import { AppState } from '..';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
// import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shoppingList.component.html',

  styleUrls: ['./shoppingList.component.css'],
  animations: [
    trigger(
      'shopListItem',

      [
        state(
          'in',
          style({
            opacity: '1',
            transform: 'translateX(0)',
          })
        ),

        transition(
          'void => *',

          [
            style({
              opacity: '0',
              transform: 'translateX(-15px)',
            }),

            animate(800),
          ]
        ),

        transition(
          // '* => void',  ///ISSO PODE SER SUBSTITUÍDO POR ':leave'...
          ':leave',

          [
            animate(
              800,
              style({
                opacity: '0',
                transform: 'translate(15px)',
              })
            ),
          ]
        ),
      ]
    ),

    trigger(
      'appEdit',

      [
        state(
          'in2',
          style({
            opacity: '1',
          })
        ),

        transition(
          'void => *',

          [
            style({
              opacity: '0',
            }),

            animate(800),
          ]
        ),
      ]
    ),
  ],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private loggingService: LoggingService,

    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onShopListItemClick(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  animationStarted(event: any) {
    ///exemplo de CALLBACK A PARTIR DE UMA ANIMATION...

    // console.log(event);
  }

  animationEnded(event: any) {
    // console.log(event);
  }
}
