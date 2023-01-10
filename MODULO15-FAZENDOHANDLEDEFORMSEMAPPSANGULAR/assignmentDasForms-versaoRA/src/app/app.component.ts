
import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  projectStatus: string[] = ['stable', 'critical', 'finished'];

  // forbiddenNames: string[] = ['TEST'];

  




  constructor() {

  }


  ngOnInit(): void {

     


    this.projectForm = new FormGroup({
      projectName: new FormControl(
        'Your Project Name',
        [Validators.required, 
          // CustomValidators.invalidProjectName.bind(this)
        ],
        // this.forbiddenNamesValidator.bind(this) as AsyncValidatorFn
        CustomValidators.forbiddenNamesValidator.bind(this) as AsyncValidatorFn
      ),

      mail: new FormControl('Your Email', [
        Validators.required,
        Validators.email,
      ]),

      projectStatus: new FormControl(this.projectStatus[0], [
        Validators.required,
      ]),
    });
  }

  onFormSubmit() {
    console.log(this.projectForm);
  }

  // forbiddenNamesValidator(
  //   control: FormControl
  // ): Promise<any> | Observable<any> {
  //   const promise = new Promise((resolve, reject) => {
  //     setTimeout(
  //       () => {
  //         // if (this.forbiddenNames.indexOf(control.value) !== -1) {
  //         if (CustomValidators.forbiddenNames.indexOf(control.value) !== -1) {
  //           resolve({ isForbiddenName: true });
  //         } else {
  //           resolve(null);
  //         }
  //       },

  //       1500
  //     );
  //   });

  //   return promise;
  // }
}
