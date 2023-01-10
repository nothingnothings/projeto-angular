
import { Actions, createEffect, Effect } from '@ngrx/effects';

import { ofType } from '@ngrx/effects'; 

import * as AuthActions from '../store/authActions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponseData, AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { Injectable } from '@angular/core'; 
import { Router } from '@angular/router';

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
    isRedirect: true,
  });
};

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(
    () => {
      return this.loginUser('LOGIN');
    },
    { dispatch: true }
  );

  authSignup$ = createEffect(
    () => {
      return this.loginUser('SIGNUP');
    },
    { dispatch: true }
  );

  authLogout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTH_LOGOUT),

        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      );
    },

    { dispatch: false }
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),

      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData')!);

        if (!userData) {
          return new AuthActions.DummyAction();
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();

          this.authService.setLogoutTimer(expirationDuration / 1000);

          return new AuthActions.AuthSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            isRedirect: false,
          });
        }
        return new AuthActions.DummyAction();
      })
    );
  });

  authRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),

        tap((authSuccessData: AuthActions.AuthSuccess) => {
          if (authSuccessData.payload.isRedirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private loginUser(operationType: 'LOGIN' | 'SIGNUP') {
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
              url,
              httpAuthData,

              {
                headers: requestHeaders,
              }
            )
            .pipe(
              tap((resData) => {
                this.authService.setLogoutTimer(+resData.expiresIn);
              }),

              map((resData) => {
                return handleAuthentication(
                  +resData.expiresIn,
                  resData.email,
                  resData.localId,
                  resData.idToken
                );
              }),

              catchError((errorRes: any) => {
                let errorMessage = 'An unknown error has occured.';

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
