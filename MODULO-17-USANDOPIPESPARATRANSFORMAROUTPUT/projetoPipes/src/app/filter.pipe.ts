import { Pipe, PipeTransform } from '@angular/core';



// @Pipe({  ////PIPE PADRÃO, SEM O 'REEXECUTE DO PIPE A PARTIR DE QUALQUER CHANGE DE DATA NA NOSSA PÁGINA' (que é o comportamento MELHOR)... (OU SEJA, PURE ESTÁ COMO 'true')...
//   name: 'filter',
// })
// export class FilterPipe implements PipeTransform {



//   transform(value: any, filterString: string): any {
//     console.log(value);
//     if (value.length === 0 || filterString === '') {
//       return value;
//     }



//     const resultArray = [];
//     for (const item of value) {
 

//       if (item.status === filterString) {
//         resultArray.push(item);
//       }

  
//     }

//     return resultArray;
//   }
// }





@Pipe({  ////PIPE COM COMPORTAMENTO ALTERADO... reloads alterados...
  name: 'filter',
  pure: false ///USE ISSO SE VOCê QUISER QUE __ SEU PIPE SEJA REEXECUTADO SEMPRE QUE OCORRER QUALQUER CHANGE DE DATA NA SUA PÁGINA.... (pode causar performance-issues, mas a página é UPDATADA AO MESMO TEMPO QUE VOCÊ VAI DIGITANDO DATA NO INPUT FIELD PARA 'fltrar' os servers)
  // 'PURE: TRUE' ---------> É O DEFAULT --> '''PURELY FOCUSES ON WHETHER THE PIPE ARGUMENTS CHANGED'''' (Sem checar se A DATA EM GERAL, data submetida ao pipe, foi alterada)... 


})
export class FilterPipe implements PipeTransform {



  transform(value: any, filterString: string): any {
    console.log(value);
    if (value.length === 0 || filterString === '') {
      return value;
    }



    const resultArray = [];
    for (const item of value) {
 

      if (item.status === filterString) {
        resultArray.push(item);
      }

  
    }

    return resultArray;
  }
}
