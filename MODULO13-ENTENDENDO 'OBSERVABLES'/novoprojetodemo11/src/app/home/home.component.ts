import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription } from 'rxjs'; ///maneira mais fácil de criar um observable...

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  intervalSubscription: Subscription;

  constructor() {}


  ngOnInit(): void {
    this.intervalSubscription = interval(1000).subscribe((count) => {
      ///o primeiro argumento de 'subscribe' é sempre uma FUNCTION/ANON FUNCTION...

      console.log(count);
    });
  }

  ngOnDestroy(): void {    /////SE VAMOS CRIAR UM 'OBSERVABLE', temos que saber COMO _ CANCELAR UMA DE NOSSAS 'SUBSCRIPTIONS' a nosso observable custom.... ---> é assim que podemos fazer; armazenamos essa subscription em uma propriedade, aí mais tarde, nesse hook de 'NgOnDestroy()', FAZEMOS UNSUBSCRIBE nessa subscription específica (pq o 'ngOnDestroy' é executado quando TROCAMOS DE PAGE, QUANDO NOSSO PAGE-COMPONENT É DESTRUÍDO, ESSENCIALMENTE)...
    
    this.intervalSubscription.unsubscribe();
  }
}









