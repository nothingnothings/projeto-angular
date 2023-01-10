
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css'],
  // animations: [



  //   trigger(  ////isso deve ser colocado lá em 'shoppingList', o parent component... (pq no item NÃO FUNCIONA BEM)...
  //        'shopListItem',
   
   
  //      [
  //        state(
  //          'in', style({
  //           opacity: '1',
  //           transform: 'translateX(0)'
  //          })
  //        ),
   
  //        transition(
  //         //  'void => *', ///isso pode ser SUBSTITUÍDO POR ':enter'
  //         ':enter',

  //        [
  //          style({ ///deixa esse style inicial para não parecer que 'PULAMOS' diretamente para o style final de 'eleemnt apareceu/chegou na tela'...
  //            opacity: '0',
  //            transform: 'translateX(-60px)'
  //          }),

  //          animate(1000) //faz com que nosso elemento progressivamente entre na tela (transição entre a posição -60 e 0, e a opacidade 0 e 1....)
  
  //         ]
  //        ),



  //        transition(
  //         // '* => void',  ///ISSO PODE SER SUBSTITUÍDO POR ':leave'...
  //         ':leave',

  //       [
  
  //         animate(10000, style(
  //           {
  //             opacity: '0',
  //             transform: 'translate(60px)'
  //           }
  //         ))
 
  //        ]
  //       )
   
  //      ]
  //   ),


   
   
  //    ]
})
export class ShoppingListItemComponent implements OnInit {
  @Input() name: string;
  @Input() amount: number;

  constructor() {}

  ngOnInit(): void {}









  // animationStarted(event: any) {  ///exemplo de CALLBACK A PARTIR DE UMA ANIMATION...

  //   console.log(event);
  // }


  // animationEnded(event: any) {
  //     console.log(event);
  // }
}
