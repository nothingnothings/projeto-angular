import { Component } from '@angular/core';

import { group, keyframes, style, trigger } from '@angular/animations'; ///ESSENCIAL.

import { state } from '@angular/animations'; //também essencial.  --> é um method TIPICAMENTE USADO NO TRABALHO COM ANIMATIONS...

import { transition } from '@angular/animations'; ///TAMBÉM É ESSENCIAL... deve ser colocado dentro dos 'trigger', no mesmo NÍVEL do set dos seus diferentes 'state()'..

import { animate } from '@angular/animations'; ////////TAMBÉM É NECESSÁRIO... define 'COMO DEVE SER FEITA A ANIMATION ENTRE ESSE (STATE A) E ESSE (STATE B)'....

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   //colocamos o nome de 'divState' pq QUEREMOS ALTERAR O 'STATE' DO ELEMENTO '<div></div>' que temos lá no nosso HTML, NESSE COMPONENT...
//   animations: [
//     trigger(
//       'divStateExample', ////////////É ASSIM QUE ADICIONAMOS ANIMATIONS ANGULAR AOS NOSSOS COMPONENTS...

//       [
//         /////É O ARRAY DE 'ANIMATIONS' que serão TRIGGADAS a partir do 'satisfact' da primeira condição, que é o trigger...

//         ////style define 'COMO DEVERÁ SER O INITIALSTATE desse service/component....

//         state(
//           'divStateExample', //sempre vamos querer ter MAIS DE 1 'state' em 1 trigger/animation, isso pq TODA ANIMATION DEPENDE DE PELO MENOS 2 'states' DIFERENTES para conseguir existir uma animation...

//           style({})
//         ),
//         state('hightlighted'),
//       ]
//     ),
//   ],

//   ///1o argumento de 'trigger' --> é o IDENTIFIER DO SEU TRIGGER... se for constatado que esse identifier está no seu template, SERÁ ATIVADO O TRIGGER....
//   ////2o argumento --> É A ANIMATION QUE VAI 'PLAY OUT' a partir do set off desse trigger...
// })

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('divStateExample', [
      state(
        'normal',
        style({
          /////queremos que o value desse 'starting state' SEJA IGUAL ao value do state ('normal', nesse caso) que temos ali embaixo, o starting state...

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
        ///////É UM METHOD SUPER INTUITIVO --> --> ELE NOS DEIXA 'DESCREVER COMO A TRANSITION DE UM STATE PARA OUTRO DEVE SE PARECER/acontecer''...

        'normal => highlighted', ////com isso, especificamos que 'A TROCA DE VALUE DE NORMAL PARA HIGHLIGHTED DEVE....'

        animate(
          /////a coisa mais simples que você pode fazer é passar um NÚMERO, que será o NÚMERO DE ms até que essa transition ACABE..

          300
        )
      ),

      transition('highlighted => normal', animate(100)),

      // transition( ////////USE ESTA VERSÃO SE VOCê QUER QUE '(STATE A) => (STATE B)'  e '(STATE B) => (STATE A)' OCORRAM COM A MESMA VELOCIDADE....
      //   'normal <=> highlighted',
      //   animate(
      //   100
      //   )
      //   ),
    ]),

    trigger(
      'wildStateExample',

      [
        state(
          'normal',
          style(
            ///STATE A
            {
              'background-color': 'green',
              transform: 'translateX(0) scale(1)',
            }
          )
        ),
        state(
          'highlighted',
          style(
            ///STATE B
            {
              'background-color': 'blue',
              transform: 'translateX(100px) scale(1)',
            }
          )
        ),

        state(
          'shrunken',
          style(
            ///STATE C
            {
              'background-color': 'red',

              transform: 'translateX(0) scale(0.5)', ///transformation mais complexazinha, queremos que o cubo diminua pela METADE..
            }
          )
        ),

        transition('normal <=> highlighted', animate(300)),
        // transition('shrunken <=> *', animate(300))  ////////COM ISSO, ESSENCIALMENTE DEFINIMOS QUE ''SE SAÍMOS DO VALUE DA STRING DE SHRUNKEN PARA QUALQUER VALUE, OU SE TROCAMOS DE QUALQUER VALUE PARA ESSE  VALUE DA STRING DE SHRUNKEN', queremos que SEJA __ APLICADA_ ESSA VELOCIDADE DE ANIMATION/ESSA ANIMATION DEFINIDA EM 'animate()'...

        /////^^^^essa é a versão SIMPLES DA ANIMATION DA TRANSITION DE 'string de shrunken/state de shrunken para qualquer outra string/state'... --> mais simples pq no 'animtate()' apenas especifiquei o TEMPO QUE ESSA ANIMATION DEVE LEVAR...

        //////VVVVVV essa é a versão COMPLEXA, em que definimos aspectos mais delicados da animation...

        //na versão mais complexa, colocamos um segundo parâmetro em 'animate()', que será um call de 'style()' para definir bem COMO SERÁ O STYLING DE NOSSO ELEMENTO durante a animation..

        // transition('shrunken <=> *', animate(300, style({ //////MAS ESSA VERSÃO É MEIO RUIM, PQ É MEIO BUGADA... (vai animate a sua ordem de 'style', e aí vai DIRETAMENTE PULAR AO END STATE... é bem feio)

        //   'border-radius': '50px'

        // })) )

        /////esse é o melhor jeito de EDITAR DETALHADAMENTE UMA DETERMINADA TRANSITION... --> DEVE-SE PASSAR UM ARRAY no lugar daquele 'animate()' method ..

        transition(
          'shrunken <=> *',

          [
            ///o array notation delimita essa 'ANIMATION INTEIRA'... (que tem 3 'PASSOS' nesse exemplo, por assim dizer; são: 1) o starting state... (é instantaneo). 2) o primeiro animate, que vai: A) por alguma razão, deixar o border-radius INSTANTANEAMENTE '50px'..., B) CONVERTER, AO LONGO DE '5s', a cor do elemento em LARANJA...

            ///'style', quando definido dentro das PHASES de uma transition, acaba APLICANDO UNS STYLES IMEDIATAMENTE (ao contrário de usos de 'animate()', que pressupõem um TEMPO até ocorrer a transformaçõa/aplicação dos styles)...
            style({ 'background-color': 'purple' }), ///o nosso 'starting state' na animation, dentro dessa animation, vai ter essa característica (esses styles)...

            animate(
              1000,
              style({ 'background-color': 'orange', 'border-radius': '15px' })
            ),

            animate(
              5000,
              style({ 'background-color': 'orange', 'border-radius': '50px' })
            ),

            animate(10000), /// esse código aí vai REMOVER o BORDER-RADIUS ao final da animation, pq é esse o 'END STATE' que definimos lá no 'state' de shrunken, como vocÊ pode ver mais acima...

            //o animate(500) vai REDUZIR O OBJECT (por conta do código do state de 'END' 'shrunken', mais acima) E AÍ VAI TRANSFORMAR A COR, VAI TRANSFORMAR DE 'ORANGE 'PARA 'RED' (end state)...
            ///ver aula 'phases em suas transtions'..

            ///se vocÊ quer ter um 'SMOOTH TRANSITION TO YOUR END STATE', talvez seja uma boa ideia colocar um 'animate(tempo)', pq o objetivo desse method com apenas o tempo sendo passado (e sem um 'style({})' ) é justamente TROCAR PARA O 'END STATE' depois de transcorridos x milissegundos
          ]
        ),
      ]
    ),

    trigger(
      'list1',

      [
        state('in', style({ opacity: '1', transform: 'translateX(0)' })),

        transition(
          'void => *', //// ou seja, não interessa se o value é 'in' ou 'out' ou 'whatever', o que interessa é que essa transition APENAS SERÁ TRIGGADA quando 'o elemento estiver em um ESTADO DE VOID (não existir no dom), para então PASSAR A EXISTIR (ter um 'value' de seu state, pode ser 'in', no caso)....

          [
            style({
              ///esse style também é necessário, queremos que nosso elemento fique INSTANTANEAMENTE com esse style, por 1 fração de segundo, quando a animation começar/começa... (e depois transicionamos para o end state, através daquele 'animate(300)', que vai fazer o 'FADE-IN')..

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
            transformation: 'translateX(0)',
          })
        ),

        transition(
          'void => *',

          // [    animate(300),      ]  /// para definir key-frames para nossa animation, devemos deixar de lado esse ARRAY com as especificações do animate 'comum' (menos complexo)... (não queremos 'different, equally weighted phases', pq agora queremos que CERTAS PHASES SEJAM MAIS IMPORTANTES)...

          ///o diferencial é esse parâmetro de 'keyframes'...

          ///// esse method 'keyframes', na function de 'animate', NOS DEIXA SER '''MAIS PRECISOS''' ACERCA DE QUANTO TEMPO CERTAS PARTES DA ANIMATION, DEFINIDAS POR MÚLTIPLOS STYLES, DEVERÃO TER... (essa parte deve durar mais, essa parte deve durar menos, etc)... ou seja, as phases não são consideradas 'EQUAL', pq vamos poder definir algumas como MAIS IMPORTANTES (duram mais) do que outras (duram menos)..
          [
            animate(
              1000,
              keyframes(
                //aqui definimos as DIFERENTES KEYFRAMES de nossa animation..
                [
                  style(
                    ////PRIMEIRA KEYFRAME de nossa animation
                    {
                      transform: 'translateX(-100px)',
                      opacity: '0',
                      // 'offset' /////PROPRIEDADE USADA PARA __ 'DEIXAR ESSA ETAPA MAIS IMPORTANTE DO QUE AS OUTRAS' (durar mais do que as outras)

                      offset: '0.00', ////é, em ms, O MOMENTO, a partir daquele tempo total (de 1000ms, nesse caso), em que QUEREMOS QUE NOSSA ANIMATION ESTEJA NESSA 'PHASE' específica... coloquei aqui o 'default' para esse nosso case, que é '0' (pq como temos 5 phases, o tempo total foi dividido em 5)...
                    }
                  ),
                  style(
                    ////SEGUNDA KEYFRAME de nossa animation
                    {
                      transform: 'translateX(-80px)',
                      opacity: '0.20',
                      // 'offset' /////PROPRIEDADE USADA PARA __ 'DEIXAR ESSA ETAPA MAIS IMPORTANTE DO QUE AS OUTRAS' (durar mais do que as outras)

                      offset: '0.200',
                    }
                  ),
                  style(
                    ////TERCEIRA KEYFRAME de nossa animation
                    {
                      transform: 'translateX(-60px)',
                      opacity: '0.40',
                      // 'offset' /////PROPRIEDADE USADA PARA __ 'DEIXAR ESSA ETAPA MAIS IMPORTANTE DO QUE AS OUTRAS' (durar mais do que as outras)

                      offset: '0.400',
                    }
                  ),
                  style(
                    ///QUARTA KEYFRAME de nossa animation
                    {
                      transform: 'translateX(-40px)',
                      opacity: '0.60',
                      // 'offset' /////PROPRIEDADE USADA PARA __ 'DEIXAR ESSA ETAPA MAIS IMPORTANTE DO QUE AS OUTRAS' (durar mais do que as outras)

                      offset: '0.600',
                    }
                  ),

                  style(
                    ///QUINTA KEYFRAME de nossa animation
                    {
                      transform: 'translateX(-20px)',
                      opacity: '0.80',
                      // 'offset' /////PROPRIEDADE USADA PARA __ 'DEIXAR ESSA ETAPA MAIS IMPORTANTE DO QUE AS OUTRAS' (durar mais do que as outras)

                      offset: '0.800',
                    }
                  ),

                  style(
                    ///SEXTA KEYFRAME de nossa animation
                    {
                      transform: 'translateX(0px)',
                      opacity: '1',
                      // 'offset' /////PROPRIEDADE USADA PARA __ 'DEIXAR ESSA ETAPA MAIS IMPORTANTE DO QUE AS OUTRAS' (durar mais do que as outras)

                      offset: '1',
                    }
                  ),
                ]
              )
            ),
          ]
        ),
      ]
    ),

    trigger(
      ///exemplo com o method de 'group', que nos permite EXECUTAR 2 'animates' AO MESMO TEMPO (execução síncrona de animates, animar 2 coisas em 1 elemento AO MESMO TEMPO)...
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
          group(
            ///esse é o method de 'group()', que nos deixa EXECUTAR 2 OU MAIS ANIMATES EM GRUPO....( sincronamente, 1 ao lado da outra)..
            [
              animate(
                1000,
                style({
                  transform: 'translateX(100px)',
                  opacity: '0',
                })
              ),

              animate(
                1000,
                style({
                  color: 'red',
                })
              ),
            ]
          ),
        ]),
      ]
    ),
  ],
})
export class AppComponent {
  animationState = 'normal'; ////vamos USAR ESSA PROPRIEDADE COMO 'CONDITION' para dar PLAY EM DIFERENTES ANIMATIONS, por meio do bind do nosso trigger de 'divStateExample' a essa propriedade....

  wildAnimationState = 'normal';

  items: string[] = ['Milk', 'Sugar', 'Bread'];

  constructor() {}

  // onDeleteItem(item: string) {
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

  // animateWildBox() {

  // }

  onShrink() {
    this.wildAnimationState !== 'shrunken'
      ? (this.wildAnimationState = 'shrunken')
      : (this.wildAnimationState = 'normal');
  }









  animationStarted(event: any) {


    console.log(event, 'STARTED')
  }



  animationEnded(event: any) {
    console.log(event, 'ENDED')
  }
}
