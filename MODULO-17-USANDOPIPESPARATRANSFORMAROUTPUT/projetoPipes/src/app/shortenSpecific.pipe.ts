import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenSpecific',
})
export class ShortenSpecificPipe implements PipeTransform {


  transform(value: any, limit: number) { ////user será OBRIGADO a passar 1 PARAMETER ao nosso pipe, que será esse 'limit' aí... a usage do pipe ficará tipo {{ string | shortenSpecific: '5'}}
    if (value.length > limit) {
      return value.substr(0, limit) + ' ...';
    }

    return value;
  }
}
