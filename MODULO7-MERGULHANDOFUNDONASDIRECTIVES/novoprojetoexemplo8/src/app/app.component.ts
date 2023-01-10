import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // numbers = [1, 2, 3, 4, 5];  ////não funciona... vocÊ não pode usar 2 structural directives em 1 mesmo element/component...

  oddNumbers = [1, 3, 5];

  evenNumbers = [2, 4];

  onlyOdd = false;

  value = 10;

}
