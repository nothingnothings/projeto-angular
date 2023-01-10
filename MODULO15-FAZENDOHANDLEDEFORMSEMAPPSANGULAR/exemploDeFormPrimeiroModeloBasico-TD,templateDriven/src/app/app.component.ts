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

  questionAnswer: string = 'TWO WAY DATABINDING';

  genders = ['Male', 'Female'];

  exemploGender = 'Female';  ///só um teste.



  user = {  ///vamos usar os values inputtados nos nossos input fields, na form, para OS ARMAZENAR AQUI E ENTÃO OUTPUTTAR no nosso template...
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
    textValue: ''

}

submitted = false;







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




    ///parte importante:


    this.user.username = formReference.value.userData.username;  ///ISSO TUDO VAI DEFINIR AQUELE STAET COMO SENDO OS VALUES que recebemos lá dos input fields...
    this.user.email = formReference.value.userData.email;
    this.user.secretQuestion = formReference.value.secret;
    this.user.answer = formReference.value.answer;
    this.user.gender = formReference.value.gender;
    this.user.textValue = formReference.value.textValue;

    this.submitted = true;


    formReference.reset(); /////RESETTA TODOS OS NOSSOS 'INPUT FIELDS', e TAMBÉM REVERTE states como 'touched' e 'dirty' AOS SEUS VALUES INICIAIS....
  }
}
