import { Injectable } from '@angular/core';

import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs'; ///nos deixa MAPPEAR O BODY DE NOSSA RESPONSE DATA, definir sua estrutura de forma mais adequada ao nosso app...


import { tap } from 'rxjs'  /////nos deixa executar código com nossa RESPONSE DATA _ mas _ SEM __ ALTERAR _O PASS DE SUA DATA _ AO SUBSCRIBE (Que vem logo depois desse operator aqui/outros operators, e que recebe nossa data do http request)...

import { Post } from './post.model';

import { catchError } from 'rxjs';///É USADO PARA TASKS COMO 'LOG ERROR MESSAGES TO ANALYTICS SERVER'... é usado em conjunto com 'THROW ERROR' (para que a ERROR DATA consiga ATINGIR/REACH OS NOSSOS COMPONENTS, PARA QUE AÍ O ACTUAL ERROR HANDLING AO USUÁRIO CONSIGA OCORRER)...
import { throwError } from 'rxjs'; ////é usado para WRAPPAR NOSSA DATA DE ERROR e então __cRIAR_ UM OBSERVABLE  (pq queremos que o '.subscribe()' nos nossos components CONSIGA 'ENCAIXAr' nesse observable)...


import { HttpHeaders } from '@angular/common/http';  ////usamos isso para definir nossos HEADERS nos http requests..
import { HttpParams } from '@angular/common/http'; // usamos isso para definir nossos QUERY PARAMS nos http requests..

@Injectable()
export class PostsHttpService {
  constructor(private http: HttpClient) {}

  private fetchPosts() {
    ///outsourcing.


    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    searchParams = searchParams.append('page' , '1');

    return this.http
      .get<{ [name: string]: Post }>(
        'https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json', ///1o argumento, é a url/route/api endpoint que você quer targettar...
        
        {  //2o e ÚLTIMO argumento: é o 'HTTP REQUEST CONFIG' object... --> define várias coisas sobre nosso http request, como OS HEADERS..

          headers: new HttpHeaders(
            {
              "Custom-Header": "Hello-Example"
            }
          ),

          params: searchParams //////// é assim que anexamos múltiplos query params a nosso http request...

          // params: new HttpParams().set( ///usado para definir QUERY PARAMs.... --> mas esse approach só nos deixa DEFINIR 1 ÚNICO QUERY PARAM, por isso é inferior... (devemos usar aquele código de 'let searchParams', visto logo acima, que nos deixa COLOCAR MÚLTIPLOS QUERY PARAMS NO NOSSO HTTP REQUEST)...

          //   'print', ///'NOME DO PARAM'  --> 'print' é um queryParam suportado pelo firebase, que vai retornar nossa data em um formato 'pretty'...
          //   'pretty' ///'VALUE DO PARAM' (print -> pretty)
          // )
        }
      
      
        )
      .pipe(
        map((responseData) => {
          const transformedPostsArray: Post[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              ///VAI CHECAR SE ISSO NÃO É UM 'PROTOTYPE' dentro da 'responseData'...
              transformedPostsArray.push({ ...responseData[key], id: key });
            }
          }

          return transformedPostsArray; ///return de 'observable' (Faça SUBSCRIPTION lá nos seus COMPONENTS, para pegar o resultado da subscription)...
        }),
        catchError(  ///usado para ERROR HANDLING TASKS GENÉRICAS, COMO 'SAVE DE ERRORS EM LOGS, EM UM ANALYTICS SERVER'....
          (errorRes) => {

            return throwError(() => errorRes); ///vai passar nossa ERROR DATA ADIANTE, PARA SER USADA/HANDLADA LÁ NOS NOSSOS '.subscribe()'..
          }
        )
      );
  }

  onCreatePost(postData: Post) {
    return this.http.post<{ name: string }>( ///return de 'observable' (Faça SUBSCRIPTION lá nos seus COMPONENTS, para pegar o resultado da subscription)...
      'https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json',

      postData, ///nossa ACTUAL DATA.



      {
        //headers,
        //params,
        // observe: 'body' ////NOS DEIXA _ DEFINIR __ 'O QUE VOCê VAI QUERER_ OBSERVE/RETORNAR COMO DATA, a partir dessa response' --> 'body' é o default, e nos retorna APENAS A DATA DO BODY DA RESPONSE..
        observe: 'response'  ///'RESPONSE' nos dá o _ RESPONSE OBJECT INTEIRO..  (se quiser acessar o response BODY com esse modo ligado, você deve escrever 'responseData.body', lá no seu method de '.subscribe()"...")
      
      
      ///observe: 'body' OU 'response' OU 'events'
      }
    );
  }

  onDeletePosts() {

    return this.http.delete(
        'https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json',


        {
          //params: xxxx,
          //headers: yyyy,
          //observe: body(default)/response/events...
          ///responseType: 'json'  ////O DEFAULT_  É JSON_ (json que é então CONVERTIDO, AUTOMATICAMENTE, em object javascript, pelo angular), mas você pode definir 'text', se estiver esperando/sua api realmente fizer o send de TEXT DATA...
            /// responseType: 'arraybuffer' | 'blob' | 'json' | 'text'
          observe: 'events'///exemplo do uso do value 'events' como DATA A SER OBSERVADA por nossos operators... (operator de 'tap', mais precisamente).... 
        }
    ).pipe(
      tap(
        (event) => {

          console.log(event); ///isso vai receber a data do 'EVENT'... (por conta de 'observe: events' )
        
            ///HttpEventType é apenas um 'helper' para nós, humanos, pq vai nos dizer O QUE CADA UM DOS valores NUMERAIS em 'type' correspondem, em termos de EVENTos... ex: ''4 é o código de uma RESPONSE, 3 é o código de um event de DownloadProgress, etc etc''...
          if (event.type === HttpEventType.Response) {

            console.log(event.body, 'I GOT A RESPONSE');
          }
        
          if (event.type === HttpEventType.Sent) {  ////sent = '0'...

            console.log(event.type, 'MY REQUEST GOT SENT');
          }

        
      
        
        
        
        }
      )
    )


  }

  onFetchPosts() {
    return this.fetchPosts();
  }
}
