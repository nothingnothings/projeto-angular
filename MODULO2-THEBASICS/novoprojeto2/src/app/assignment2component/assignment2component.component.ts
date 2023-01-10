import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment2component',
  templateUrl: './assignment2component.component.html',
  styleUrls: ['./assignment2component.component.css']
})
export class Assignment2componentComponent implements OnInit {


  username = '';



  constructor() { }

  ngOnInit(): void {
  }

  // onInputValueChange(event: Event) {

  // }



  onButtonClick() {
    this.username = '';
  }


}
