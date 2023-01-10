import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  oddNumbers: number[] = [];

  evenNumbers: number[] = [];

  onNumberAdded(number: number) {
      console.log(number)
    console.log(this.oddNumbers)


    if (!!(number % 2)) {
      this.oddNumbers.push(number);
    } else {
      this.evenNumbers.push(number);
    }
  }
}
