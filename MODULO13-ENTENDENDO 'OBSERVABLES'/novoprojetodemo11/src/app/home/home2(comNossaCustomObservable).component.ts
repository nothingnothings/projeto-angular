import { Component, OnDestroy, OnInit } from '@angular/core';

import 
{ 
    // interval,  vamos REPLICAR O CONTEÚDO DESSE 'observable' built-in... mas com nossas PRÓPRIAS MÃOS..

    Observable,   Observer,   ////isto é usado PARA CRIAR CUSTOM OBSERVABLES, para que nós consigamos criar nossos próprios observables...
    Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  customObservable: Subscription;

  constructor() {}

  ngOnInit(): void {


    ///será nosso CUSTOM OBSERVABLE, que criamos por conta própria, e que replica o comportamento do built-in observable/function de 'interval()'..
    //NESSA CONST É _ CRIADA A NOSSA 'OBSERVABLE'...
    const customIntervalObservable = new Observable(
        (observer) => {

            //tudo isso faz parte da LÓGICA de nossA OBSERVABLE ( o objetivo é fazer com que um 'event' desse 'interval' seja emitido A CADA SEGUNDO, por meio de 'setInterval()')....
            let count = 0;  ////pq esse é o VALUE que vamos querer que seja EMITIDO GRADUALMENTE (de 1 em 1 segundo, de acordo com aquele 'count++')..
            setInterval(
                () => {


                  observer.next(count);
                  //observer.error();  ///usado quando você quer 'EMIT A DATA PACKAGE' de error, dizendo que algo deu errado.... seu observable vai emitir essa info...
                  //observer.complete();  ///usado quando você quer 'emit uma data package que diz que vocÊ ACABOU COM ESSE OBSERVABLE', o observable acabou sua tarefa (ex: http request, quando o tópico é o 'receive da response')...





                  if (count == 2) {
                    observer.complete();  ///QUANDO VOCÊ CHAMA 'observer.complete()', O _ _OBSERVABLE __ VAI REALMENTE 'PARAR'... --> não alcançaremos 'observer.error()', por exmeplo, nesse exemplo aqui....
                  }




              



                    if (count > 3) {
                      observer.error(new Error('Count is greater than 3!')); ////// quando um ERROR é emitido por um OBSERVABLE, o observable 'MORRE', ele PARA__ DE EMITIR_ as próprias data packages.... --> isso significa que NÃO PRECISAMOS MAIS DAR 'UNSUBSCRIBE' nesse observable, pq ele  já terá cometido 'suicídio' por meio do emit do error....
                  }


                },
                1000 ///depois de 1 SEGUNDO INTEIRO vamos querer FAZER _ EMIT _ DO VALUE _ de nosso observable, que é aquele 'count' em 'observer.next(count)'...
            )

            count++;
        },
    );    



  

    customIntervalObservable.subscribe(
        (count) => { //será um NUMBER...  ////// O PRIMEIRO PARÂMETRO DE '.subscribe()' (nossa subscription) é '''A LÓGICA QUE EXECUTAMOS SE FOR RECEBIDA UMA DATA PACKAGE COMUM, VINDA DE NOSSO OBSERVABLE''''...

            console.log(count);
            console.log('DATA --  data package emitted by observable. We can run some logic for EACH data packet that is emitted.')
        },
        (error) => {  //O SEGUNDO PARÂMETRO DE '.subscribe()' (nossa subscription) é '''A LÓGICA QUE EXECUTAMOS SE FOR RECEBIDA UMA DATA PACKAGE __DE ERRO___ (que interrompe o emit de data da observable), VINDA DE NOSSO OBSERVABLE''''...
          console.log(error);
          console.log('ERROR -- "ERROR" data package emitted by observable. Observable data emissions stopped.')
      },
      () => {   /////COMO O 'observer.complete()' NÃO NOS PASSA NENHUM ARGUMENT, AQUI DEIXAMOS UM ARGUMENT VAZIO...
        /////TERCEIRO PARÂMETRO DE '.subscribe()', é usado quando OCORRE O EMIT DE UMA DATA PACKET DE 'observer.complete()" POR NOSSO OBSERVABLE....
        
        console.log('COMPLETED -- "completed" data package emitted by observable. Observable data emissions stopped/killed.')
    }

    )
    

  }

  ngOnDestroy(): void {    /////SE VAMOS CRIAR UM 'OBSERVABLE', temos que saber COMO _ CANCELAR UMA DE NOSSAS 'SUBSCRIPTIONS' a nosso observable custom.... ---> é assim que podemos fazer; armazenamos essa subscription em uma propriedade, aí mais tarde, nesse hook de 'NgOnDestroy()', FAZEMOS UNSUBSCRIBE nessa subscription específica (pq o 'ngOnDestroy' é executado quando TROCAMOS DE PAGE, QUANDO NOSSO PAGE-COMPONENT É DESTRUÍDO, ESSENCIALMENTE)...
    
    this.customObservable.unsubscribe();
  }
}
