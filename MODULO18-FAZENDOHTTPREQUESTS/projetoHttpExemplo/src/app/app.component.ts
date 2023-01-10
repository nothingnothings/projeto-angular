import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';




/////OUTSOURCEADOS.
// import { HttpClient } from '@angular/common/http'; ///DEVE SER UTILIZADO, JUNTO DE 'HttpClientModule', lá em 'angular.module.ts', PARA CONSEGUIRMOS FAZER SEND DE HTTP REQUESTS...

// import { map } from 'rxjs'; ////UM DE NOSSOS OPERATORS, a ser usado em nossos OBSERVABLES (no caso, será usado NO OBSERVABLE DE 'http'...)...

import { Post } from './post.model'; ///modelo de post, CRIADO POR NÓS,  a ser usado PARA ESPECIFICAR COMO É A DATA QUE SERÁ RETORNADA DE NOSSO HTTP REQUEST...
import { PostsHttpService } from './postsHttp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loadedPosts: Post[] = [];

  isLoading: boolean = false;


  error = null;

  // loadedPosts: any[] = [];

  // constructor(private http: HttpClient) {
  // constructor(private http: HttpClient) {}
  constructor(private httpPosts: PostsHttpService) {}

  ngOnInit() {
    // this.fetchPosts();

    this.fetchPosts();

    console.log(this.loadedPosts);
  }


  onCreatePost(formReference: NgForm) {

    console.log(formReference.value);

    const postData = formReference.value;

    this.httpPosts.onCreatePost(postData).subscribe(
      (responseData) => {

        console.log(responseData);
        console.log(responseData.body); //agora isso pode ser acessado, graças a 'observe: 'response' ' lá nos parâmetros de '.post()'...
        formReference.reset(); //resetta os values de todos os fields a partir de um submit bem sucedido...

        this.loadedPosts.push(
        postData
        )
      }
    )

    
  }

  onClearPosts() {
    //send HTTP request

    this.httpPosts.onDeletePosts()
    .subscribe(
      (responseData) => {

        console.log(responseData);
        this.loadedPosts = [];
      }
    )

   

  }

  fetchPosts() {
    this.isLoading = true;

    this.httpPosts.onFetchPosts().subscribe(
      
      
      (postsData) => {
      this.loadedPosts = postsData;
      this.isLoading = false;
    },

    (error) => {  
      console.log('TEST ERROR');
      console.log(error);
      this.isLoading = false;
        this.error = error.error.error; //mensagem de error.
        console.log(this.error);
    } 

    );
  }



    onHandleError() {
      this.error = null;

    }










}







// export class AppComponent {
//   loadedPosts: Post[];

//   isLoading: boolean = false;

//   // loadedPosts: any[] = [];

//   // constructor(private http: HttpClient) {
//   constructor(private http: HttpClient) {}

//   ngOnInit() {

//     this.fetchPosts();

//     console.log(this.loadedPosts);
//   }

//   /////////////ISTO NÃO FUNCIONARÁ, POIS NÃO ESTAMOS USANDO OBSERVABLES COM ESSE HTTP REQUEST...
//   // onCreatePost(formReference: NgForm) {
//   //   //send HTTP POST request

//   //   console.log(formReference.value);

//   //   const postData = formReference.value;

//   //   this.http.post('https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json',    //// '/posts.json' --> é uma IDIOSSINCRASIA DO 'FIREBASE', e não do angular --> precisamos definir um 'NOVO PATH' para armazenar nossos posts diretamente, e aí, AO FINAL DESSA ROUTE, SOMOS OBRIGADOS A ESCREVER '.json' (coisa do FIREBASE , que é MALUCO)...

//   //   postData ///NOSSO OBJECT JAVASCRIPT SERÁ CONVERTIDO EM JSON DATA AUTOMATICAMENTE...

//   //   );

//   //   formReference.reset(); //resetta os values de todos os fields a partir de um submit bem sucedido...
//   // }

//   onCreatePost(formReference: NgForm) { ///VAI FUNCIONAR, PQ USAMOS _ OBSERVABLES COM ESSE HTTP REQUEST....
//     //send HTTP POST request

//     console.log(formReference.value);

//     const postData = formReference.value;

//       //você não precisa chamar 'ngOnDestroy()' para dar unsubscribe em subscriptions feitas em cima de 'this.http.post()'...
//     ///this.http.post VAI NOS RETORNAR UM __ OBSERVABLE, SEMPRE... E AÍ VAMOS TER DE FAZER __ SUBSCRIBE __ A ELE..
//     this.http.post<{name : string}>('https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json',    //// '/posts.json' --> é uma IDIOSSINCRASIA DO 'FIREBASE', e não do angular --> precisamos definir um 'NOVO PATH' para armazenar nossos posts diretamente, e aí, AO FINAL DESSA ROUTE, SOMOS OBRIGADOS A ESCREVER '.json' (coisa do FIREBASE , que é MALUCO)...

//     postData ///NOSSO OBJECT JAVASCRIPT SERÁ CONVERTIDO EM JSON DATA AUTOMATICAMENTE...

//     ).subscribe(
//       (responseData) => {  //// 'responseData' --> é o equivalente ao nosso 'BODY' da response... não vai reunir TUDO TUDO da response (coisas como headers e tal, essas coisas são acessadas por OUTROS METHODS DA RESPONSE, NO ANGULAR)...

//           console.log(responseData);

//       }
//     )

//     formReference.reset(); //resetta os values de todos os fields a partir de um submit bem sucedido...
//   }

//   onFetchPosts() {
//     //send HTTP GET request...

//     this.fetchPosts();
//   }

//   onClearPosts() {
//     //send HTTP request
//   }

//   // private fetchPosts() {
//   //   this.http.get('https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json')
//   //   .subscribe(
//   //     (responseData ) => {

//   //       console.log(responseData);
//   //       // this.loadedPosts = responseData;
//   //       // const newArrayDataOfObject = Object.values(responseData); ////maneira alternativa de CONVERTER NOSSO 'OBJECT COM OBJECTS' em um ARRAY de objects (sem o uso de OPERATORS DE OBSERVABLES...)
//   //     //   console.log(newArrayDataOfObject);
//   //     //  return this.loadedPosts = newArrayDataOfObject;
//   //       // this.loadedPosts = postsArray;

//   //     }
//   //   )
//   // }

//   private fetchPosts() {

//     this.isLoading = true;

//     ///o value que você passa dentro desse '<>' É __ O VALUE _ QUE SERÁ ACTUALLY_ RETORNADO PELA RESPONSE, NO BODY DA RESPONSE... (o value será retornado NESSE FORMATO AÍ, essencialmente...)
//     this.http.get<{[key: string]: Post}>('https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json')
//     .pipe( /////é assim que usamos 'OPERATORS' nos nossos observables (no caso, o observable de 'http')...
//     map(
//       // (responseData: any) => {
//         (responseData) => {

//         const transformedPostsArray: Post[] = [];

//         for (const key in responseData) {

//           if (responseData.hasOwnProperty(key)) {  ///VAI CHECAR SE ISSO NÃO É UM 'PROTOTYPE' dentro da 'responseData'...
//             transformedPostsArray.push({...responseData[key], id: key});
//           }

//         }

//         return transformedPostsArray;

//       }
//     )
//     )

//     .subscribe(
//       // (responseData ) => {
//         (posts) => {

//         // console.log(responseData);
//         console.log(posts);
//         // this.loadedPosts = responseData;
//         // const newArrayDataOfObject = Object.values(responseData); ////maneira alternativa de CONVERTER NOSSO 'OBJECT COM OBJECTS' em um ARRAY de objects (sem o uso de OPERATORS DE OBSERVABLES...)
//       //   console.log(newArrayDataOfObject);
//       //  return this.loadedPosts = newArrayDataOfObject;
//         // this.loadedPosts = postsArray;

//         this.loadedPosts = posts;
//         this.isLoading = false;

//       }
//     )
//   }

// }
