import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    ///method bem complicado, mas útil, pq pode fazer coisas como 'add o user token aos QUERYPARAMS  DE todos OS requests que saem de seu app'...

    return this.authService.user.pipe(
      take(1),

      // map((userOnDemand) => {  ////ESSE CÓDIGO DE 'MAP()' está errado, pq o ACTUAL SET DE NOSSO OBJECT USER NO 'LOCAL STORAGE' OCORRE LÁ NO SERVICE DE 'auth',  E NAÕ AQUi... ( e o check por essa token também acontece lá, em um method que é chamado lá no 'ngOnInit()' de nosso starter app component)...
      //   let user = userOnDemand;

      //   console.log(userOnDemand);
      //   if (userOnDemand === null) { // se nosso user não tiver sido 'EMITIDO' pelo subject em 'authService' (subject de 'user'), vamos querer PEGAR ESSA INFO LÁ DE NOSOS 'LOCAL STORAGE'....
      //     // user = new User(
      //     //   localStorage.getItem('email')!,
      //     //   localStorage.getItem('userId')!,
      //     //   localStorage.getItem('token')!,
      //     //   new Date(localStorage.getItem('expirationDate')!)
      //     // );


      //     const loadedUser = JSON.parse(localStorage.getItem('userData')!)




      //     user = new User(
      //       // localStorage.getItem('email')!,
      //       // localStorage.getItem('userId')!,
      //       // localStorage.getItem('token')!,

      //       loadedUser!.email!,
      //       loadedUser!.userId!,
      //       loadedUser!.token!,
      //       new Date(loadedUser.expirationDate!)
      //     );



      //     console.log('ENTERED', user);
      //   }
      //     console.log(user);
      //   return user;

      // }),

      exhaustMap((userOnDemand) => {
        console.log('INTERCEPTOR');
        console.log(userOnDemand);



        if (!userOnDemand) {
          return next.handle(req);
        }
        const queryParams = new HttpParams()
          .set('auth', userOnDemand?.token!)
          .set('recipeBy', userOnDemand?.id!);

        const requestClone = req.clone({
          params: queryParams,
        });

        console.log(requestClone);

        return next.handle(requestClone);
      })
    );
  }
}
