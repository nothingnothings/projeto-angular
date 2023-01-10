import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidators {







    static forbiddenNamesValidator(   ////VERSÃO ASYNC...
      control: FormControl,
    ): Promise<any> | Observable<any> {

      const promise = new Promise((resolve, reject) => {
        setTimeout(
          () => {
            if (control.value === 'TEST') {
              resolve({ 'isForbiddenName': true });
            } else {
              resolve(null);
            }
          },

          1500
        );
      });

      return promise;
    }

//   static invalidProjectName(
//     control: FormControl
//   ): { [s: string]: boolean } | null {
//     if (control.value === 'Test') {
//       return { isForbiddenName: true };
//     }

//     return null;
//   }
}
