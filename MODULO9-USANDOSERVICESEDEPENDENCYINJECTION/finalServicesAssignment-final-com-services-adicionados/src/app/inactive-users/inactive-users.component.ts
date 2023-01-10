import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
})
export class InactiveUsersComponent implements OnInit {
  // @Input() users: string[]; //não precisamos mais disso, pq agora receberemos esses 'users' LÁ DO SERVICE DE 'usersService'....

  users: string[];

  // @Output() userSetToActive = new EventEmitter<number>(); ///não é necessário, com o uso de services...

  constructor(private usersService: UsersService) {

    this.users = usersService.inactiveUsers
  }

  ngOnInit(): void {}

  onSetToActive(id: number) {
    // console.log(id)
    // this.userSetToActive.emit(id)
    this.usersService.onSetToActive(id);
    console.log(this.usersService.counter)
  }
}
