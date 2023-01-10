import { Pipe, PipeTransform } from '@angular/core'; ////sempre é melhor você IMPLEMENTAR ESSA INTERFACE, QUANDO VOCÊ VAI __ CRIAR UM __ NOVO PIPE...

///OBS: PIPES DEVEM SEMPRE SER ADICIONADAS NO ROL DE 'declarations' lá em 'app.module.ts'....





@Pipe( ///// ISSO É NECESSÁRIO, ESSE DECORATOR É NECESSÁRIO...
    {
        name: 'shorten'  /////ESSE SERÁ O NOME PELO QUAL VOCÊ INVOCARÁ ESSE SEU PIPE específico, esse seu 'custom pipe'...
    }
)
export class ShortenPipe implements PipeTransform {
  // transform(value: any, , , , , ) {     /////esse pipe comporta o pass de múltiplos parameters...

  // }

  transform(value: any) {
    ////aqui só vamos querer receber o VALUE, sem o pass de parameters adicionais configurando o comportamento de nosso pipe (contrariamente a pipes como 'SlicePipe')..




    if (value.length > 10) { ///string maior do que 10 caracteres, vamos querer abreviar ...
        return value.substr(0, 10) + ' ...'; /////retorna uma SUBSTRING (só uma parte da initial string)
    }


    return value;

  
  }






}
