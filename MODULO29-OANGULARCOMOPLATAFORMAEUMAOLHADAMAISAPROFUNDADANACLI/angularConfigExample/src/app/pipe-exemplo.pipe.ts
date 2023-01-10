import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeExemplo'
})
export class PipeExemploPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
