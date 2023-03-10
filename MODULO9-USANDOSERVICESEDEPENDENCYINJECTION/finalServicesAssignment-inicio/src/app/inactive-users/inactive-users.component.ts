import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {


    @Input() users: string[];
    @Output() userSetToActive = new EventEmitter<number>();




  constructor() { }

  ngOnInit(): void {
  }


  onSetToActive(id: any) {
    console.log(id)
    this.userSetToActive.emit(id)
  }

}
