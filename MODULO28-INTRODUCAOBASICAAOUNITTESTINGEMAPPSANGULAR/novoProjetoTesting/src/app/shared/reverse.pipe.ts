import { Pipe } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe {
  transform(value: string) {
    return value.split('').reverse().join(""); ////usamos isso para REVERTER a nossa string (colocá-la de trás para frente)....
  }
}
