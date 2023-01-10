import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

import { Params } from '@angular/router';

import { Subscription } from 'rxjs'; // é usado para ARMAZENARMOS NOSSA SUBSCRIPTION, PARA POSTERIORMENTE NÓS A REMOVERMOS COM 'ngOnDestroy()'...
///isso pq NOSSOS COMPONENTS SÃO DESTRUÍDOS QUANDO TROCAMOS DE '''PAGE'''', MAS AS 'SUBSCRIPTIONS' não....
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent2 implements OnInit, OnDestroy {
  user: { id: number; name: string };

    paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const selectedUserId: string = this.route.snapshot.params['userId'];

    console.log(selectedUserId);

    const selectedUser = this.usersService.users.find((user) => {
      return user.id.toString() === selectedUserId;
    });

    this.user = selectedUser!;

   this.paramsSubscription = this.route.params.subscribe((newParams: Params) => {
      console.log(newParams);
      this.user.id = newParams['userId'];
    });
  }



  ngOnDestroy(): void {  ///é aqui que vamos querer DESTRUIR NOSSA SUBSCRIPTION...

    this.paramsSubscription.unsubscribe();
  }

}
