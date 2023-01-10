import { Directive } from '@angular/core';
import {
  AsyncValidator,
  FormControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Directive({
  selector: '[forbiddenUsernameValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forbiddenUsernameDirective,
      multi: true,
    },
  ],
})
export class forbiddenUsernameDirective implements AsyncValidator {
  constructor() {}

  validate(control: FormControl): Promise<any | null> | Observable<any | null> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(
        () => {
          if (control.value === 'TEST') {
            console.log('ENTERED');
            resolve({
              usernameIsForbidden: true,
            });
          }
          console.log(control);
          resolve(null);
        },

        1500
      );
    });

    return promise;
  }
}
