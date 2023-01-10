import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';

// import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment'

exhaustMap

import { BehaviorSubject, 
  catchError, //ESSE OPERATOR É MELHOR, FAZ O HANDLE DE OBJECTS DE 'ERROR' (error responses dos nossos http requests) mais adequadamente..


   exhaustMap, /////////este operator é usado para cases em que você tem um SUBSCRIBE DENTRO DE OUTRO SUBSCRIBE..
  Subject, 
  tap } from 'rxjs'; 
import { throwError } from 'rxjs'; ////esse operator funciona conjuntamente com 'catchError'....
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '..';


import * as fromAuthActions from './store/authActions';

export interface AuthResponseData {
  kind: string;
  email: string;
  refreshToken: string;
  idToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean; ///será um field opcional... existirá na response de 'SIGNUP', mas não existirá na response de 'LOGIN'...
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new Subject(); ////vamos usar esse subject PARA _ ARMAZENAR NOSSA 'USER DATA' obtida lá das routes de login/signup DENTRO DO BROWSER DO USER, PARA QUE POSSA SER USADA EM TODOS OS REQUESTS, PARA FINS DE AUTHENTICATION E ACESSO A PROTECTED ROUTES...

  // token: string | null = null;   //não usamos esse approach, e sim o BEHAVIORSUBJECT...




    ////COM O NGRX, NÃO PRECISAMOS MAIS DESSE SUBJECT...
  // user = new BehaviorSubject<User | null>(null);  ////vamos usar esse  __TIPO ESPECIAL _  DE SUBJECT PARA _ ARMAZENAR NOSSA 'USER DATA' obtida lá das routes de login/signup DENTRO DO BROWSER DO USER, PARA QUE POSSA SER USADA EM TODOS OS REQUESTS, PARA FINS DE AUTHENTICATION E ACESSO A PROTECTED ROUTES...



  ///behaviorSubject's são parecidos com Subjects comuns, mas a diferença é que ele vai 'catch' as datas emitidas nos seus 'subscribe' ATÉ MESMO _ DEPOIS_ DA DATA PERTINENTE TER SIDO EMITIDA (quer dizer que seu efeito é '''atrasado''', em outras palavras, pq ele vai catch a data imediatamente, até mesmo DEPOIS DE ELA TER SIDO EMITIDA, pega o RESÍDUO do emit, basicamente)...
///e vamos usar o value inicial de 'null', para essa data retornada por esse subject...



  tokenExpirationTimer: any;



  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) {}

  onCreateAccount(authData: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    const requestHeaders = new HttpHeaders();

    requestHeaders.append('Content-Type', 'application/json');
    
    // requestHeaders.append('Content-Type', 'application/json');

    return this.http
      .post<AuthResponseData>(
        // // 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJgmB6dgifUuTeYPm1MLeJ7Jh93spUKtg',  ///VERSÃO _ DUMMY__ (sem authentication rules no firebase)
        // 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBK3AXsu9Gn0fqLmA0zOdUAknDM48Nwk_o', ////VERSÃO COM AUTHENTICATE, DEPLOY
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,

        authData,
        {
          headers: requestHeaders,
        }
      )
      .pipe(
        catchError(
          //vamos usar esse operator para MANIPULAR NOSSAS 'ERROR RESPONSES', QUANDO OCORREREM..
          (errorRes) => {
            console.log(errorRes);
            let errorMessage = 'An unknown error has occured.';

            if (!errorRes.error || !errorRes.error.error) {
              //conserta o choro do typescript..
              return throwError(() => errorMessage); /////vai dar throw da message de 'An unknown error occurred!'
            }

            switch (errorRes.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists.';
            }

            return throwError(() => errorMessage);
          }
        ),

        tap(
          
        //   (responseData) => {
        //   ////é aqui que fazemos o STORAGE de nossa 'user auth data' LÁ NO LOCAL STORAGE DO USER (storage de token e etc)....

        //   const { email, localId, expiresIn, idToken } = responseData;

        //   const expirationDate = new Date( /// vai nos dar um object 'Date'...
        //     new Date().getTime() + +expiresIn * 1000
        //   );

        //   const newUser = new User(email, localId, idToken, expirationDate);

        //   this.user.next(newUser); ///fazemos NEXT de nosso user NO SUBJECT, para que essa mudança de user data SEJA _ TRANSMITIDA AO LOGNO DO NOSSO APP..
        // }
        
        (responseData) => {
    
          // this.storeUserToken(responseData); ///CÓDIGO SEM NGRX....
          // this.emitUser(responseData);
          // this.autoLogout(+responseData.expiresIn);


                                    ///CÓDIGO COM NGRX....


                this.handleUser(responseData);
        }
        
        )
      );

    // .subscribe((responseData) => {
    //   console.log(responseData);

    // });
  }

  onLogin(authData: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    const requestHeaders = new HttpHeaders();

    requestHeaders.append('Content-Type', 'application/json');

    return this.http
      .post<AuthResponseData>(
        // <{expiresIn: number, idToken: string, expirationDate: string, localId: string, email: string}>

        // // 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJgmB6dgifUuTeYPm1MLeJ7Jh93spUKtg', //VERSÃO DUMMY (sem authentication rules no firebase)
        // 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBK3AXsu9Gn0fqLmA0zOdUAknDM48Nwk_o', ////VERSÃO COM AUTHENTICATE, DEPLOY

        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        authData,

        {
          headers: requestHeaders,
        }
      )
      .pipe(
        catchError((errorRes) => {
          console.log(errorRes);

          let errorMessage = 'An unknown error has occured.';

          switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'No user found for the entered email!';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'Invalid password, please try again.';
          }

          return throwError(() => errorMessage);
        }),

        tap(
          (responseData) => {
            
            // const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000); ////lembre-se de adicionar '* 1000', pois o JAVASCRIPT SEMPRE CONSIDERA 'TEMPO' EM MILISSEGUNDOS, E NÃO EM SEGUNDOS.... (só o 'expiresIn' que é mostrado em segundos....)
            // localStorage.setItem('token', responseData.idToken);
            // localStorage.setItem('expirationDate', expirationDate.toString());
            // localStorage.setItem('userId', responseData.localId);
            // localStorage.setItem('email', responseData.email );
            console.log(+responseData.expiresIn);
     
            // this.emitUser(responseData);  //trocamos pelo method que altera o STATE DO NGRX... (method de baixo)
            this.handleUser(responseData);
            this.storeUserToken(responseData);
            this.autoLogout(+responseData.expiresIn);
          }
        )
      );
    // .subscribe(
    //   (responseData) => {
        // console.log(responseData);
        // const expirationDate = new Date(new Date().getTime() + responseData.expiresIn * 1000); ////lembre-se de adicionar '* 1000', pois o JAVASCRIPT SEMPRE CONSIDERA 'TEMPO' EM MILISSEGUNDOS, E NÃO EM SEGUNDOS.... (só o 'expiresIn' que é mostrado em segundos....)
        // localStorage.setItem('token', responseData.idToken);
        // localStorage.setItem('expirationDate', expirationDate.toString());
        // localStorage.setItem('userId', responseData.localId);
        // localStorage.setItem('email', responseData.email )

    //     this.router.navigate(['/recipe-book'])
    //   }
    // )
  }











  private storeUserToken(responseData: AuthResponseData) {

    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000); ////lembre-se de adicionar '* 1000', pois o JAVASCRIPT SEMPRE CONSIDERA 'TEMPO' EM MILISSEGUNDOS, E NÃO EM SEGUNDOS.... (só o 'expiresIn' que é mostrado em segundos....)
    // localStorage.setItem('token', responseData.idToken); ///versão que usei no REACT.
    // localStorage.setItem('expirationDate', expirationDate.toString());
    // localStorage.setItem('userId', responseData.localId);
    // localStorage.setItem('email', responseData.email );


      ///versão que uso no ANGULAR
    const userObject = {
      token: responseData.idToken,
      expirationDate: expirationDate.toString(),
      userId: responseData.localId,
      email: responseData.email
      
    }


    localStorage.setItem('userData', JSON.stringify(userObject))


  }



    //method bem importante.
  // autoLogin() {  ////sem o uso de NGRX.


  //   const userData = JSON.parse(localStorage.getItem('userData')!); ///O VALUE QUE VAMOS RETRIEVAR LÁ DO LOCAL STORAGE DEFINITIVAMENTE SERÁ UMA STRING, por isso usamos 'JSON.parse()' para converter essa string (json data) em um OBJECT JAVASCRIPT 


  //   if (!userData) { ///case em que NÃO TEMOS TOKEN ALGUMA/token inválida no local storage..
  //     return; 
  //   }



  //   const loadedUser = new User(userData.email, userData.userId, userData.token!, new Date(userData.expirationDate));


  

  //   if(loadedUser.token) { ////com isso, através do GETTER de 'loadedUser.token' (pq nosso model de 'User' tem esse getter), _ CHECAMOS _ SE EXISTE UM VALID TOKEN DENTRO DESSE NOSSO USER (caso não exista, o getter retornará 'null' --> isso pq NULL É UM FALSY VALUE, e tiramos vantagem disso nesse if block aqui...)...


  //     console.log(typeof userData.expirationDate);
  //     const expirationDuration = Date.parse(userData.expirationDate) - new Date().getTime();  ///coloquei o '/1000' pq esse value deve entrar COMO SECONDS, lá nessa nossa function de 'authLogout()'..
       
  //     ////se nosso token no localStorage for VÁLIDO, vai fazer forward dessa info a TODOS OS COMPONENTS DE NOSSO APP, por meio desse forward de 'loadedUser', autenticando nosso user, essencialmente...
  //   this.user.next(loadedUser);  ////vai reatualizar a UI DE NOSSO APP com esse user que vai ser fetcheado da data inserida no local storage(é o 'auto-login', presente quando sempre recarregamos nossa page..)


  //   console.log(expirationDuration / 1000);

  //   this.autoLogout(expirationDuration/1000);
  //   }

  // }





  autoLogin() { ///COM O USO DE NGRX...


    const userData = JSON.parse(localStorage.getItem('userData')!); ///O VALUE QUE VAMOS RETRIEVAR LÁ DO LOCAL STORAGE DEFINITIVAMENTE SERÁ UMA STRING, por isso usamos 'JSON.parse()' para converter essa string (json data) em um OBJECT JAVASCRIPT 


    if (!userData) { ///case em que NÃO TEMOS TOKEN ALGUMA/token inválida no local storage..

      console.log('entered');
      return; 
    }



    const loadedUser = new User(userData.email, userData.userId, userData.token!, new Date(userData.expirationDate));


  

    if(loadedUser.token) { ////com isso, através do GETTER de 'loadedUser.token' (pq nosso model de 'User' tem esse getter), _ CHECAMOS _ SE EXISTE UM VALID TOKEN DENTRO DESSE NOSSO USER (caso não exista, o getter retornará 'null' --> isso pq NULL É UM FALSY VALUE, e tiramos vantagem disso nesse if block aqui...)...


      console.log(typeof userData.expirationDate);
      const expirationDuration = Date.parse(userData.expirationDate) - new Date().getTime();  ///coloquei o '/1000' pq esse value deve entrar COMO SECONDS, lá nessa nossa function de 'authLogout()'..
       
      
    this.store.dispatch(new fromAuthActions.AuthSuccess(loadedUser)) //// VERSÃO DO NGRX


    console.log(expirationDuration / 1000);

    this.autoLogout(expirationDuration/1000);
    }

  }





  // private emitUser(responseData: AuthResponseData | null) {  ///VERSÃO _ SEM NGRX (uso de subjects, emit de nosso object 'user' por meio do BehaviorSubject)....




  //   if (responseData === null)  {

  //    return  this.user.next(null);
  //   }



  //   const { email, localId, expiresIn, idToken } = responseData;

  //         const expirationDate = new Date( /// vai nos dar um object 'Date'...
  //           new Date().getTime() + +expiresIn * 1000
  //         );

  //         const newUser = new User(email, localId, idToken, expirationDate);

  //         this.user.next(newUser); 
  // }


  private handleUser(responseData: AuthResponseData | null) {  ///VERSÃO _ COM NGRX (deixamos nosso behavior subject de lado) --> aqui, vamos fazer o DISPATCH DE UMA ACTION, ACTION QUE VAI ALTERAR NOSSO 'STATE' DE 'auth', o QUE POR SUA VEZ VAI INFFLUENCIAR TODOS OS LUGARES DE NOSSO APP VINCULADOS A ESSE STATE (handlando nossa authentication, em outras palavras)...
    
    if (responseData === null)  {

    //  return  this.user.next(null);

    this.store.dispatch(new fromAuthActions.AuthLogout());
    } else {



    const { email, localId, expiresIn, idToken } = responseData;

          const expirationDate = new Date( /// vai nos dar um object 'Date'...
            new Date().getTime() + +expiresIn * 1000
          );

          const newUser = new User(email, localId, idToken, expirationDate);

          // this.user.next(newUser); 

          this.store.dispatch(new fromAuthActions.AuthSuccess(newUser))
    }
  }









  logoutUser() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('email');
    


    // this.emitUser(null); //Agora usamos o method do NGRX, 'handleUser'... (criei para fazer o dispatch de actions, especificamente)...

    this.handleUser(null);

    // localStorage.removeItem('userData'); //agora faço isso na própria action, não precisa ser aqui....

    this.router.navigate(['/auth']);


    if (this.tokenExpirationTimer) {   ///'cleanup' de nosso timer de 'autologout' (em caso de tokens expiradas), CUJO TIMER NÃO VAI DEIXAR DE EXISTIR SOZINHO.. (precisamos limpar manualmente, com 'clearTimeout()')....

      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null; ///resettamos o state de nosso 'tokenExpirationTimer' property...


  
  }






  autoLogout(expirationTime: number) {  //define um TIMER para então FAZER LOGOUT do user (quando o tempo acabar).... em milissegundos...

  this.tokenExpirationTimer = setTimeout(
       () => {

        this.logoutUser();


       },
       expirationTime * 1000  ///vai transformar isso, nossos segundos, em MILISSEGUNDOS...

     );

  }





}
