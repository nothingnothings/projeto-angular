///todos seus effects serão organizados em CLASSES, esse é o ngrx effects... npm install --save @ngrx/effects

import { Actions, createEffect, Effect } from '@ngrx/effects'; /// é diferente de 'Action' lá de @ngrx/store....

import { ofType } from '@ngrx/effects'; //'ofType 'é um _ OPERATOR _ _FORNECIDO PELO NGRX (e não pelo rxjs)... --> é usado para 'FILTRAR' as actions que interessam/triggam cada 1 de nossos effects...

import * as AuthActions from '../store/authActions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponseData, AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { Injectable } from '@angular/core'; ////precisamos disso, pq vamos injetar coisas diversas nesses nossos effects, como 'http', o HttpClient service...
import { Router } from '@angular/router';
///também fazemos inject das 'Actions'...

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthActions.AuthSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    isRedirect: true
  });
};




@Injectable()
export class AuthEffects {
  //aqui vamos definir os possíveis effects dessa feature de nosso app... (side-effects, como send de http requests, etc)...

  //     /esse é nosso PRIMEIRO EFFECT...  -> essa é a versão 'DEPRECADA' desse código...

  // @Effect()  /////DECORATOR USADO PELO 'NGRX/EFFECTS' para IDENTIFIAR UM EFFECT em nosso app... (é obrigatório) --> foi deprecado, e hoje o method de 'createEffect()' é usado no seu lugar...
  // authLogin = this.actions$.pipe(   ///'actions$'é um observable, mas O NGRX _ NOS DEIXA _ FICAR 'SEM FAZER SUBSCRIBE A ELE', PQ O SUBSCRIBE É AUTOMÁTICO com ele...

  // ofType(AuthActions.AUTH_START),  ////com isso, dizemos que 'APENAS AS ACTIONS DE TYPE AUTH_START DISPATCHEADAS' é que vão __TRIGGAR_ ESSE NOSSO EFFECT DE 'Authlogin'...

  // switchMap(  ////nos deixa CRIAR UM NOVO OBSERVABLE, A PARTIR DA DATA DE UM OBSERVABLE ANTERIOR (que, no caso, será o observable que segurará a DATA ENVIADA, COMO PAYLOAD, por nossa action de 'AuthActions.AUTH_START')...

  //     (authData: AuthActions.AuthStart) => {  ////data contida dentro de nosso object 'action' de 'AUTH_START' (com o payload e etc)... --> sempre coloque o 'type' desse argumetno como sendo EQUIVALENTE À CLASS/action que você definiu lá no arquivo de class, que também será a action que vai triggar esse effect específico....

  //                     ////dentro desse operator, vamos retornar a MESMA LÓGICA DE LOGIN QUE TÍNHAMOS NO NOSSO SERVICE DE 'LOGIN'...

  //                     const requestHeaders = new HttpHeaders();

  //                     requestHeaders.append('Content-Type', 'application/json');

  // const httpAuthData = {
  //     email: authData.payload.email,
  //     password: authData.payload.password
  // }

  //             return this.http
  // .post<AuthResponseData>(

  //   `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
  //   httpAuthData,

  //   {
  //     headers: requestHeaders,
  //   }
  // )
  // }
  // )
  // )

  ////effects __ PODEM __ OU NÃO_ RETORNAR 'NEW DISPATCHABLE ACTIONS' ao final de seus códigos... o 'authLogin' é um exemplo de EFFECT QUE FAZ DISPATCH DE UMA DESSAS ACTIONS (action de 'AuthSuccess') ... --> já o effect de 'AuthSuccess' NÃO FAZ ISSO; ELE _ NÃO _ FAZ O RETURN DE UMA NOVA 'DISPATCHABLE ACTION' ao final...
  authLogin$ = createEffect(
    () => {
      return this.loginUser('LOGIN'); ///o código de baixo foi TODO OUTSOURCEADO...

      // return this.actions$.pipe( ///pipe call no nosso OUTER OBSERVABLE, que é this.actions$....
      //   ofType(AuthActions.AUTH_START),
      //   switchMap((authData: AuthActions.AuthStart) => {
      //     const requestHeaders = new HttpHeaders();
      //     requestHeaders.append('Content-Type', 'application/json');

      //     const httpAuthData: {email: string, password: string, returnSecureToken: boolean} = {
      //       email: authData.payload.email,
      //       password: authData.payload.password,
      //       returnSecureToken: true
      //     };

      //     return this.http.post<AuthResponseData>(  //aqui temos um pipe call NO NOSSO INNER OBSERVABLE, que é 'this.http.post()'...
      //       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      //       httpAuthData,

      //       {
      //         headers: requestHeaders,
      //       }
      //     ).pipe(  ///AQUI, ESTAMOS CHAMANDO '.pipe()' NO NOSSO INNER OBSERVABLE, em 'this.http.post()' (ao contrário do OUTER OBSERVABLE, que é 'this.actions$.post()' )...
      //     map(  // 1 ////  executa código e faz dispatch de uma action de 'AUTH_SUCCESS' caso não ocorra nenhum error com esse http request observable...
      //     (resData: AuthResponseData) => {

      //         const expirationDate = new Date(
      //         new Date().getTime() + +resData.expiresIn * 1000
      //       );
      //               ///'of()' é um method que te AJUDA A CRIAR NOVOS OBSERVABLES.... --> MAS AQUI NÃO PRECISAMOS DELE, PQ O 'map()' JÁ FAZ AUTOMATICAMENTE O 'WRAP' de tudo que você retorna nele COMO _ UM _- OBSERVABLE...
      //         // of(new AuthActions.AuthSuccess(new User(resData.email, resData.localId, resData.idToken, expirationDate)))

      //         return new AuthActions.AuthSuccess(new User(resData.email, resData.localId, resData.idToken, expirationDate));  /////RETURN DE NOVO OBSERVABLE, essencialmente... essa nossa action NOVA será retornada como um OBSERVABLE, por meio do uso de 'map()'...
      //     }
      //   ),
      //     // catchError( /// 2 //// executa código e faz dispatch de uma action de 'AUTH_FAIL' CASO OCORRA UM ERROR NO SEND DESSE HTTP REQUEST/RESPONSE recebida por ele..
      //     //     (error) => {
      //     //         ////usamos o 'of()' para CRIAR UM NOVO OBSERVABLE, OBSERVABLE QUE NÃO SEJA DE 'ERROR', pq queremos MANTER A 'OBSERVABLE STREAM' de this.actions$.pipe()' SEMPRE VIVA...
      //     //         ///o uso de 'of()' é necessário, aqui, pq NÃO VAMOS USAR 'map()' nessa parte de nosso código (e é apenas o 'map()' que vai sempre CONVERTER AQUILO QUE VOCê RETORNOU AUTOMATICAMENTE EM UM OBSERVABLE)...

      //     //         of()
      //     //     }
      //     //   ),

      //             catchError(
      //         (errorRes) => {

      //           let errorMessage = 'An unknown error has occured.';

      //           if (!errorRes.error || !errorRes.error.error) {
      //             return of(new AuthActions.AuthFail(errorMessage))
      //           }

      //           switch (errorRes.error.error.message) { //lógica reutilizada, lá de 'auth.service.ts'...
      //             case 'EMAIL_NOT_FOUND':
      //               errorMessage = 'No user found for the entered email!';
      //               break;
      //             case 'INVALID_PASSWORD':
      //               errorMessage = 'Invalid password, please try again.';
      //               break;
      //             case 'EMAIL_ALREADY_EXISTS':
      //               errorMessage = 'Email already exists, please try again.';
      //           }

      //             return  of( ////VAMOS RETORNAR UM NOVO 'DISPATCH DE UMA ACTION', que será um observable, essencialmente... (por conta de 'of()', que cria NOVOS OBSERVABLES)....
      //               new AuthActions.AuthFail(errorMessage)
      //             )
      //         }
      //       ),

      //     )
      //   })
      // );
    },
    { dispatch: true } ////é o default.. força o RETURN DE UMA NOVA ACTION/DISPATCHABLE ACTION/observable, ao final desse nosso effect...
  );

  authSignup$ = createEffect(
    () => {
      return this.loginUser('SIGNUP');

      // return this.actions$.pipe(
      //   ofType(AuthActions.AUTH_SIGNUP_START)
      // ),
      // switchMap(
      //   (authData: AuthActions.AuthSignupStart ) => {

      //     const requestHeaders = new HttpHeaders();
      //     requestHeaders.append('Content-Type', 'application/json');

      //     const httpAuthData: {email: string, password: string, returnSecureToken: boolean} = {
      //       email: authData.payload.email,
      //       password: authData.payload.password,
      //       returnSecureToken: true
      //     };

      //     const expirationDate = new Date(
      //       new Date().getTime() + +resData.expiresIn * 1000
      //     );
      //     return new AuthActions.AuthSuccess(new User(resData.email, resData.localId, resData.idToken, expirationDate))
      //   }
      // )
    },
    { dispatch: true }
  );

  // authSuccess$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(AuthActions.AUTH_SUCCESS),

  //       tap((authData: AuthActions.AuthSuccess) => {
  //         localStorage.setItem('userData', JSON.stringify(authData.payload));
  //         this.router.navigate(['/']);
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  authLogout$ = createEffect(
    () => {
      console.log('ENTERED');
      return this.actions$.pipe(
        ofType(AuthActions.AUTH_LOGOUT),

        tap(() => {
          this.authService.clearLogoutTimer(); ////previne memory leaks em razão de nossos timers para logout...
          localStorage.removeItem('userData');
          // console.log('entered');
          this.router.navigate(['/auth']);
        })
      );
    },

    { dispatch: false }
  );


  ///MEU CÓDIGO.... NÃO FUNCIONOU. 


  // autoLogin$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(AuthActions.AUTO_LOGIN),

  //       switchMap(() => {
  //         const userData = localStorage.getItem('userData');
  //         if (!userData) {
  //           return of(new AuthActions.AuthLogout());
  //         } else {
  //           const user = JSON.parse(userData);

  //           const expirationDate = new Date(user.expirationDate);

  //           if (expirationDate <= new Date()) {
  //             return of(new AuthActions.AuthLogout());
  //           } else {
  //             console.log(user);
  //             return of(new AuthActions.AuthSuccess(user));
  //           }
  //         }
  //       })
  //     );
  //   },
  //   { dispatch: true }
  // );


  autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),


        map(  //tudo que é retornado aqui será AUTOMATICAMENTE DISPATCHEADO COMO UMA 'NOVA ACTION'...
          () => {

              const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
              } = JSON.parse(localStorage.getItem(
                'userData'
              )!);


              if (!userData) {
                // return { type: 'DUMMY'};  ///action falsa... não vai fazer coisa alguma...
                return new AuthActions.DummyAction();
              }

              const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
              )

              if (loadedUser.token) {

                const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();


                this.authService.setLogoutTimer(expirationDuration / 1000);

                console.log(loadedUser);
                // console.log('TEST LINE')
                return new AuthActions.AuthSuccess({
                  email: loadedUser.email,
                  userId: loadedUser.id,
                  token: loadedUser.token,
                  expirationDate: new Date(userData._tokenExpirationDate),
                  isRedirect: false
                });

        // const expirationDuration =
        //   new Date(userData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);


              }
              return new AuthActions.DummyAction();
              // return { type: 'DUMMY'};
          }
        )
      )
    }
  )






  
authRedirect$ = createEffect( ///redireciona o user a partir das actions de 'success' e 'logout', ambos os cases vão para a page de '/'...
  () => {
      return this.actions$.pipe(
          ofType(AuthActions.AUTH_SUCCESS,
              // AuthActions.AUTH_LOGOUT  //removendo isto, impedimos CONFLITOS/RACE entre ESSE EFFECT E O AUTHGUARD (que tem sua própria lógica de redirects....)
            ),

          tap(
              (authSuccessData: AuthActions.AuthSuccess) => {

                if (authSuccessData.payload.isRedirect) {
                  this.router.navigate(['/']);
                }
              }
          )
      )
  },
  {dispatch: false}
)






  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    //// a naming convention é realmente usar 'actions$' ($ ao final)  ---> uma das naming conventions é nomear TODOS OS OBSERVABLES DO ANGULAR Com '$' AO FINAL...
  }

  ///HELPER METHOD para os cases de 'login/signup' (lógica compartilhada: mesmo authData que deve ser inputtado, e mesmo dispatch da action de 'AUTH_SUCCESS'):

  private loginUser(operationType: 'LOGIN' | 'SIGNUP') {  ///como essa é basicamente a lógica de nossos 'effects' outsourceada, é OBRIGATÓRIO FAZER O RETURN DE UM NOVO OBSERVABLE AO FINAL (como o dispatch de uma nova action)...
    let url: string;

    let type: string = AuthActions.AUTH_START;

    if (operationType === 'LOGIN') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`;
      type = AuthActions.AUTH_SIGNUP_START;
    }

    return this.actions$.pipe(
      ofType(type as any),
      switchMap(
        (authData: AuthActions.AuthStart | AuthActions.AuthSignupStart) => {
          const requestHeaders = new HttpHeaders();
          requestHeaders.append('Content-Type', 'application/json');

          const httpAuthData: {
            email: string;
            password: string;
            returnSecureToken: boolean;
          } = {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          };

          return this.http
            .post<AuthResponseData>(
              // `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,

              url,
              httpAuthData,

              {
                headers: requestHeaders,
              }
            )
            .pipe( //pipe no INNER OBSERVABLE DE 'this.http.post()'...


            tap(
              (resData) => {
                // console.log(resData.expiresIn);
                this.authService.setLogoutTimer(+resData.expiresIn);  ////ISSO VAI SETTAR UM 'TIMER' para rodar um dispatch de LOGOUT...
              }
            ),

              map((resData) => {
                // const expirationDate = new Date(
                //   new Date().getTime() + +resData.expiresIn * 1000
                // );

                // return new AuthActions.AuthSuccess({
                //   email: resData.email,
                //   token: resData.idToken,
                //   userId: resData.localId,
                //   expirationDate: expirationDate,
                // });

                return handleAuthentication( //faz o ACTUAL LOGIN e _ TAMBÉM_ armazena a data do user no localStorage...
                  +resData.expiresIn,
                  resData.email,
                  resData.localId,
                  resData.idToken
                )

              }),

              catchError((errorRes: any) => {  //aqui não devemos fazer o THROW DE ERRORS (pq isso mata a observable chain), E SIM DEVEMOS _ FAZER O DISPATCH DA ACTION DE 'AuthFail' APrOPRIADA....
                let errorMessage = 'An unknown error has occured.';
                // console.log(errorRes);

                if (!errorRes.error || !errorRes.error.error) {
                  return of(new AuthActions.AuthFail(errorMessage));
                }

                switch (errorRes.error.error.message) {
                  case 'EMAIL_NOT_FOUND':
                    errorMessage = 'No user found for the entered email!';
                    break;
                  case 'INVALID_PASSWORD':
                    errorMessage = 'Invalid password, please try again.';
                    break;
                  case 'EMAIL_ALREADY_EXISTS':
                    errorMessage = 'Email already exists, please try again.';
                }

                return of(new AuthActions.AuthFail(errorMessage));
              })
            );
        }
      )
    );
  }
}

















// OK, TEMOS 2 'FLOWS' NO NOSSO APP...









// FLOW 1:





// AUTH_START ou AUTH_START_SIGNUP --> isso triga o 'authLogin' ou 'authSignup' effects... -->  isso faz com que SEJA OU DISPATCHEADO 'AUTH_FAIL' (case de falha no login/signup) OU __ COM QUE ENTREMOS NA FUNCTION DE 'handleAuthentication'... --> a function de 'handleAuthentication' vai: 1) FAZER O STORE DA DATA DO USER NO LOCAL STORAGE 2)FAZER DISPATCH DA ACTION DE 'AUTH_SUCCESS', que vai ACTUALLY nos deixar 'LOGGED IN', pq vai ATUALIZAR O STATE... --> por fim, SOMOS REDIRECIONADOS a 'localhost:4200/' (Slash nothing), por conta de 'authRedirect', que está vinculado às actions de 'AUTH_SUCCESS' e 'AUTH_LOGOUT'...





// FLOW 2:


// AUTO_LOGIN ----> esse dispatch (em 'app.component.ts') --> TRIGGA O effect de 'autoLogin'... -->  esse effect vai PROCURAR NA LOCAL STORAGE, pela user data --> se encontra a USER DATA, JA PULA DIRETAMENTE PARA O DISPATCH DE 'AUTH_SUCCESS', que vai NOS AUTHENTICATE, PQ VAI ATUALIZAR O STATE DE 'AUTH'... (caso contrário, caso não encontrar esse user na local storage, vai dispatchear 'dummy action', e continuaremos NÃO LOGADOS)...


