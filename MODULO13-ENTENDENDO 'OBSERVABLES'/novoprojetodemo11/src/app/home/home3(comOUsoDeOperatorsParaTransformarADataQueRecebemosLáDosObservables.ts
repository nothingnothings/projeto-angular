import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Observer, Subscription } from 'rxjs';

import { map, filter } from 'rxjs/operators'; ///////// ESSE É UM OPERATOR. É UM DOS OPERATORS MAIS UTILIZADOS...
                            //utilize-o para MANIPULAR/TRANSFORMAR A DATA QUE VOCÊ RECEBE LÁ DE SEUS 'OBSERVABLES', antes de essa data atingir seu subscribe/subscriptions...
                          ///use esse operator com '.pipe()'...   o filter também é famoso...
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  customObservable: Subscription;

  constructor() {}

  ngOnInit(): void {
    const customIntervalObservable = new Observable((observer) => {   ///////OBSERVABLE 
      let count = 0;
      setInterval(() => {
        observer.next(count); 

        if (count == 2) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
      }, 1000);

      count++;
    });



    ///////OPERATOR
    // customIntervalObservable.pipe(map( //////esse é um OPERATOR, É USADO PARA _ TRANSFORMAR A DATA QUE RECEBEMOS LÁ DE NOSSOS 'observables'....

    // (data ) => {    ////'data' é a DATA QUE RECEBEMOS, INICIALMENTE, POR PARTE DE NOSSO OBSERVABLE, e que vamos TRANSFORMAR por meio desse nosso 'operator', que nesse caso é 'map'...


    //   // return data; /// DATA INALTERADA... completamente inútil usar o 'map' assim....


    //   return `Round:  ${data}`
    // }
 
    // ));  

    // customIntervalObservable.subscribe(  //////////OBSERVER (sem UM OPERATOR ACOPLADO A SI)
    //   (count) => {
    //     console.log(count);
    //     console.log(
    //       'DATA --  data package emitted by observable. We can run some logic for EACH data packet that is emitted.'
    //     );
    //   },
    //   (error) => {
    //     console.log(error);
    //     console.log(
    //       'ERROR -- "ERROR" data package emitted by observable. Observable data emissions stopped.'
    //     );
    //   },
    //   () => {
    //     console.log(
    //       'COMPLETED -- "completed" data package emitted by observable. Observable data emissions stopped/killed.'
    //     );
    //   }
    // );


    ////é assim que usamos um OPERATOR COM NOSSA SUBSCRIPTION...
  this.customObservable = customIntervalObservable.pipe(
      
      filter((data: any) => {
        // return true;
        // return false; //hardcoded
         return data > 3;       //return de uma expression --> vai retornar 'TRUE' OU 'FALSE', pq esse 'data' é/será um number... --> os values que resultam em 'true' passam, os que resultam em 'false' são barrados...


      }),

      
      
      map((filteredData) => { return `Round: ${filteredData}`})).subscribe(  //////////OBSERVER (COM UM OPERATOR ACOPLADO A SI)
    (count) => {
      console.log(count);
      console.log(
        'DATA --  data package emitted by observable. We can run some logic for EACH data packet that is emitted.'
      );
    },
    (error) => {
      console.log(error);
      console.log(
        'ERROR -- "ERROR" data package emitted by observable. Observable data emissions stopped.'
      );
    },
    () => {
      console.log(
        'COMPLETED -- "completed" data package emitted by observable. Observable data emissions stopped/killed.'
      );
    }
  );



  }

  ngOnDestroy(): void {
    this.customObservable.unsubscribe();
  }
}
