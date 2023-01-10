import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
})
export class ActiveUsersComponent implements OnInit {
  // @Output() userSetToInactive = new EventEmitter<number>();  //não precisamos disso, pq agora estamos dependendo dos SERVICEs para conseguir acesso ao array de 'users'...

  // @Input() users: string[]; //não precisamos mais disso, pq agora receberemos esses 'users' LÁ DO SERVICE DE 'usersService'....

  users: string[];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users = this.usersService.activeUsers;
  }

  onSetToInactive(id: number) {
    // this.userSetToInactive.emit(id)
    this.usersService.onSetToInactive(id);
  }
}
