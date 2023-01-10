import { Component, OnInit } from '@angular/core';

import { AsyncValidatorFn, FormArray, FormControl, FormGroup, Validators } from '@angular/forms'; /// NO REACTIVE APPROACH, usamos UM MONTE DAS CLASSES OFERECIDAS POR ESSA PACKAGE...
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['Male', 'Female'];


  forbiddenUsernames: string[] = ['Chris', 'Anna'];

  signupForm: FormGroup; //nossa 'overall form' sempre será isso, um 'FORM GROUP', um grande COMPILADO DE TODOS OS input fields, selects, textareas, radio buttons, etc

  ///VERSÃO SEM NESTING...
  // ngOnInit(): void {   ////é bem melhor inicializar iniicalmente nossa form AQUI, em 'ngOnInit()'....

  //   this.signupForm = new FormGroup({  /////ISSO VAI __ CRIAR UMA _ NOVA FORM _ QUASe__ VÁLIDA...

  //     ////sempre wrappe o nome de seus input fields em _ STRINGS_...
  //     'username': new FormControl(  ////é usado para CRIAR A REPRESENTAÇÃO DESSE INPUT FIELD em si... e ele tem VÁRIOS ARGUMENTOS QUE DEVEM SER PASSADOS..

  //     null, //// 1/////// O PRIMEIRO PARÂMETRO É o 'INITIAL VALUE' de seu input field... colocamos 'null' pq queremos que fique EM BRANCO...

  //     [ Validators.required, Validators.minLength(5)]

  //     ),

  //     'email': new FormControl( ///user input de 'email'

  //       null,

  //       ///não EXECUTE esses methods de '.required' e '.email', pq esses methods DEVEM SER EXECUTADOS AUTOMATICAMENTE PELO ANGULAR, QUANDO ELE DETECTAR QUE o input DESSE 'FormControl' ESPECÍFICO foi mudado..
  //   [   Validators.required, Validators.email ]      ///O SEGUNDO PARÂMETRO É OU 1 ÚNICO VALIDATOR, OU UMA LISTA DELES..  --> esses validators são importados lá de 'angular/forms'...

  //     ),

  //     'gender': new FormControl(this.genders[0] //queremos definir o 'initial value', value default, como sendo 'male' no início...
  //       ,

  //       [Validators.required]
  //       )

  //   }

  //   );
  // }

  ////VERSÃO COM NESTING DE NOSSOS 'FormControl's em FormGroups dentro de nosso outer FormGroup:




    //// FormControl -> primeiro argumento É __ O DEFAULT VALUE desse input field.  SEGUNDO ARGUMENTO É OS 'SYNCHRONOUS VALIDATORS' a serem usados. TERCEIRO ARGUMENTO É OS 'ASYNC VALIDATORS' a serem usados...
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      ///////this.forbiddenNamesValidator.bind(this)  --> com isso, consertamos aquele bug dos custom validators, que não se referem ao 'this' de nossa class IMEDIATAMENTE; é necessário esse bind aí...
      'userData': new FormGroup({ ////AQUI É POSSÍVEL OBSERVAR O 'NESTING' de 1 form GROUP dentro do nosso 'OVERALL FORM GROUP' (que representa nossa FORM INTEIRA)...
        'username': new FormControl(null, [Validators.required, this.forbiddenNamesValidator.bind(this), Validators.minLength(5)]
        ),
        'email': new FormControl(  null, //1o argumento
          
          [Validators.required, Validators.email], ///2o argumento
          

          [this.forbiddenEmails.bind(this) as AsyncValidatorFn] ///3o argumento
          
          ),
      }),
      'gender': new FormControl(this.genders[0], [Validators.required]),
      'hobbies': new FormArray([])
    });


      /////2 OBSERVABLES BONS DE SEREM USADOS PARA COISAS 'MINUCIOSAS', 'statusChanges' e 'valueChanges'...

      //observa-se a FORM EM GERAL por 'valueChanges'
    // this.signupForm.valueChanges.subscribe( ////bom para fazer listen to a quaisquer changes na nossa input/control e aí renderizar coisas a partir disso...
    //   (value) => {
    //         console.log(value, 'FORMVALUE CHANGED');
    //   }
    // )


    ///observa-se um FORMCONTROL individual por valueChanges
  //   this.signupForm.get('userData.username')?.valueChanges.subscribe( ////bom para fazer listen to a quaisquer changes na nossa input/control e aí renderizar coisas a partir disso...
  //   (value) => {
  //         console.log(value, 'FORMVALUE CHANGED');
  //   }
  // )



 //observa-se a FORM EM GERAL por 'statusChanges'
  this.signupForm.statusChanges.subscribe( /////dispara SEMPRE QUE O STATUS DE NOSSA FORM FOR ALTERADO (valid para invalid, etc etc)...
    (status) => {
          console.log(status);
    }
)



 ////observa-se UM FORMCONTROL INDIVIDUAL por 'statusChanges'
 this.signupForm.get('userData.username')?.statusChanges.subscribe( /////dispara SEMPRE QUE O STATUS DE NOSSA FORM FOR ALTERADO (valid para invalid, etc etc)...
 (status) => {
       console.log(status);
 }
)








// this.signupForm.setValue(
//   {
//       'userData': {
//           'username': 'Max',
//           'email': 'max@test.com'
//       },
//       gender: 'male',
//       'hobbies': []
//   }
// )





// this.signupForm.patchValue(
//   {
//       'userData': {
//           'username': 'Anna',
//           }
//   }
          
// )







// this.signupForm.reset();










  }





  onSubmitForm() {
    //checar arquivo html, no '(ngSubmit)="onSubmitForm()"'

    console.log(this.signupForm.value); ///com isso, COM a form ARMAZENADA NESSA PRORPIEDAED no arquivo typescript, podemos a referenciar a qualquer hora no código typescript...
  }









  onAddHobby() {
    // (this.signupForm.get('hobbies') as FormArray).push(new FormControl(null, [Validators.minLength(5)]))

    ///esse código de type casting é bem raro....s
      const newControl: FormControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

    (<FormArray>this.signupForm.get('hobbies')).push(newControl);
  }




  getControls() {  ///ver anotações em 'RA - ANTES DA AULA DE ARRAYS DE FORM CONTROLS'
      return (<FormArray>this.signupForm.get('hobbies')).controls;
  }




  /////EXEMPLO DE CUSTOM  VALIDATOR (isso só existe no approach REACTIVE)
forbiddenNamesValidator(control: FormControl): {  //ISSO SIGNIFICA QUE ESSE METHOD DEVERÁ NOS RETORNAR UM OBJECT com formato como ''{nameIsForbidden: true}'''
    [s: string]: boolean} | null 
    
    
    {

    // console.log(this);
      ///'this' dentro dessa class estará _ ERRADO__....


      ///// '-1' é considerado como 'truthy', lembre-se disso...
  if (this.forbiddenUsernames.indexOf(control.value) !== -1) { ////SE NOSSA VALIDATION __ FALHAR_, vamos querer retornar 'true'... (paradoxal, eu sei)...
    return {'isForbiddenName': true }
  }



  return null;  //SE NOSSA VALIDATION __ FOR BEM SUCEDIDA, VAMOS QUERER RETORNAR 'null' ou 'nothing'... ( ou seja, VOCÊ NAÕ DEVE RETORNAR ESSE OBJECT com algo como '{'nameIsForbidden: false'}' )
}









/////EXEMPLO DE CUSTOM ASYNC VALIDATOR
forbiddenEmails(control: FormControl): Promise<any> | Observable<any> { 



    const promise = new Promise(
      (resolve, reject) => {

        setTimeout(
          () => {

              if (control.value === 'test@test.com') { //input foi INVÁLIDO. Email foi o case 'test@test.com'....
                resolve(
                  {
                    'isForbiddenEmail': true
                  }
                )
              } else {
                resolve(null); ////input foi VÁLIDO. Email não foi o caso 'test@test.com'
              }

          },
          1500
        )
      }
    )




  return promise;

}













}





