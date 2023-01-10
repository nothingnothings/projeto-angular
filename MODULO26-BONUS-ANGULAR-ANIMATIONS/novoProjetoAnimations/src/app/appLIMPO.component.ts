import { Component } from '@angular/core';

import { group, keyframes, style, trigger } from '@angular/animations';

import { state } from '@angular/animations';

import { transition } from '@angular/animations';

import { animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('divStateExample', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0px) ',
        })
      ),
      state(
        'highlighted',
        style({
          'background-color': 'blue',
          transform: 'translateX(200px)',
        })
      ),

      transition(
        'normal => highlighted',

        animate(300)
      ),

      transition('highlighted => normal', animate(100)),
    ]),

    trigger(
      'wildStateExample',

      [
        state(
          'normal',
          style({
            'background-color': 'green',
            transform: 'translateX(0) scale(1)',
          })
        ),
        state(
          'highlighted',
          style({
            'background-color': 'blue',
            transform: 'translateX(100px) scale(1)',
          })
        ),

        state(
          'shrunken',
          style({
            'background-color': 'red',

            transform: 'translateX(0) scale(0.5)',
          })
        ),

        transition('normal <=> highlighted', animate(300)),

        transition(
          'shrunken <=> *',

          [
            style({ 'background-color': 'purple' }),

            animate(
              1000,
              style({ 'background-color': 'orange', 'border-radius': '15px' })
            ),

            animate(
              5000,
              style({ 'background-color': 'orange', 'border-radius': '50px' })
            ),

            animate(10000),
          ]
        ),
      ]
    ),

    trigger(
      'list1',

      [
        state('in', style({ opacity: '1', transform: 'translateX(0)' })),

        transition(
          'void => *',

          [
            style({
              opacity: '0',
              transform: 'translateX(-20px)',
            }),

            animate(300),
          ]
        ),

        transition('* => void', [
          animate(
            300,
            style({
              opacity: '0',
              transform: 'translateX(50px)',
            })
          ),
        ]),
      ]
    ),

    trigger(
      'list2',

      [
        state(
          'inExemplo2',
          style({
            opacity: '1',
            transform: 'translateX(0)',
          })
        ),

        transition(
          'void => *',

          [
            animate(
              1000,
              keyframes([
                style({
                  transform: 'translateX(-100px)',
                  opacity: '0',

                  offset: '0.00',
                }),
                style({
                  transform: 'translateX(-80px)',
                  opacity: '0.20',

                  offset: '0.200',
                }),
                style({
                  transform: 'translateX(-60px)',
                  opacity: '0.40',

                  offset: '0.400',
                }),
                style({
                  transform: 'translateX(-40px)',
                  opacity: '0.60',

                  offset: '0.600',
                }),

                style({
                  transform: 'translateX(-20px)',
                  opacity: '0.80',

                  offset: '0.800',
                }),

                style({
                  transform: 'translateX(0px)',
                  opacity: '1',

                  offset: '1',
                }),
              ])
            ),
          ]
        ),
      ]
    ),

    trigger(
      'list3',

      [
        state(
          'inExemplo3',
          style({
            opacity: '1',
            transform: 'translateX(0)',
          })
        ),

        transition('* => void', [
          group([
            animate(
              300,
              style({
                transform: 'translateX(100px)',
                opacity: '0',
              })
            ),

            animate(
              300,
              style({
                color: 'red',
              })
            ),
          ]),
        ]),
      ]
    ),
  ],
})
export class AppComponent {
  animationState = 'normal';

  wildAnimationState = 'normal';

  items: string[] = ['Milk', 'Sugar', 'Bread'];

  constructor() {}

  onDeleteItem(index: number) {
    this.items.splice(index, 1);
  }

  onAddItem(item: string) {
    if (!item) {
      return;
    }
    this.items.push(item);
  }

  animateBox() {
    switch (this.animationState) {
      case 'normal':
        this.animationState = 'highlighted';
        break;
      case 'highlighted':
        this.animationState = 'normal';
        break;
    }

    switch (this.wildAnimationState) {
      case 'normal':
        this.wildAnimationState = 'highlighted';
        break;
      case 'highlighted':
        this.wildAnimationState = 'normal';
        break;
      case 'shrunken':
        this.wildAnimationState = 'normal';
    }
  }

  onShrink() {
    this.wildAnimationState !== 'shrunken'
      ? (this.wildAnimationState = 'shrunken')
      : (this.wildAnimationState = 'normal');
  }
}
