import { Component, ViewChild } from "@angular/core";

import { NgForm } from "@angular/forms";



@Component(
    {
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }
)



export class AppComponent {


    @ViewChild('formReference') formReference: NgForm; //////////ISTO MUDA TUDO.... (forma alternativa de SELECIONAR/REFERENCIAR/ACESSAR NOSSO 'FORM ELEMENT' lá no código do template... basta usar uma local reference e a chamar seu nome naquele 'viewChild') 


  



    


    
  onSubmitForm() {  
    console.log(this.formReference);
    console.log('submitted!')

    console.log('ISDIRTY?', this.formReference.dirty);

    console.log(this.formReference.value);
    console.log('ISVALID?', this.formReference.valid);
    console.log('ISTOUCHED?', this.formReference.touched)
  }


  suggestedUserName() {
    const suggestedName = 'Ronaldo'


    // this.formReference.setValue( ////APPPROACH NÃO RECOMENDADO PARA _ MUDAR_ _ OS VALUES _ que você tem em seus input fields (pq aí o resto dos input fields vai acabar alterado, também, quando só QUERÍAMOS FAZER O CHANGE DO VALUE DE 'username', nesse nosso exemplo...)
    //   {
    //     userData: {
    //       username: suggestedName,
    //       email: ''
    //     },
    //     secret: 'pet',
    //     questionAnswer: '',
    //     gender: 'Male',
    //     textValue: ''
    //   }
    // )

    this.formReference.form.patchValue({

      userData: {
        username: suggestedName ////COM ISSO, OVERWRITTAMOS apenas esse control específico, dentro desse formGroup de 'userData' que também foi definido por nós...
    }
    }) ////METHOD PREFERÍVEL AO DE CIMA... --> vamos querer patchear APENAS O FIELD QUE NOS INTERESSA.... (alterar seu value para um value diferente)...



  }








}