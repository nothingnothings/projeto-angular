import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-component',
  templateUrl: './training-component.component.html',
  // styleUrls: ['./training-component.component.css'],
  styles: [
    `
    .whiteColor {
          color: white;
    }
    
    `
  ]
})
export class TrainingComponentComponent implements OnInit {
  showParagraph = false;
  buttonClicks: number[] = [];



  constructor() {
   
  }

  ngOnInit(): void {}

  onButtonClick(event: Event) {
    this.showParagraph = !this.showParagraph;
    console.log(event);
    this.buttonClicks.push(event.timeStamp);
  }


  getColor() {

    console.log(this.buttonClicks)
    return;
  }
}
