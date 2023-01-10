import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  defaultQuestion: string = 'pet';  ////'pet' para a 'option' número 1, 'teacher' para a option número 2 (propriedade 'value' em cada 'option' é o que conta)...

  defaultTextValue: string = `There was one occasion in which I wrote a very long text, it was very long and had multiple lines and...`


  questionAnswer: string = 'TWO WAY DATABINDING'; ///É USADO COM TWO WAY DATABINDING...


  suggestedUserName() {
    const suggestedName = 'Superuser';
  }


  onSubmitForm(formReference: NgForm) { ///aqui será passado o ACTUAL FORM element, com todos seus input fields e <selects> (os controls de sua form, essencialmente)..
    console.log(formReference);
    console.log('submitted!');

    console.log('ISDIRTY?', formReference.dirty);

    console.log(formReference.value);
    console.log('ISVALID?', formReference.valid);
    console.log('ISTOUCHED?', formReference.touched);
  }
}
