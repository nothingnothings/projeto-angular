import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

import { Router } from '@angular/router';
import { User } from './user.model';
import { AppState } from '..';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

  constructor(
    
    
    // private authService: AuthService,  ////SUBSTITUÍDO PELO NGRX...

    private store: Store<AppState>,
    
    
    private router: Router
    
    
    ) { }




  


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    


    // console.log(route.queryParams); ////CÓDIGO QUE _ NÃO FUNCIONA_-
    // console.log(route.params);
    // console.log(route)


    // console.log(state.url);

    // if (!route.queryParams['auth']) {
    //   this.router.navigate(['/auth']);
    //   return false;

    // } else {


    //   return true;
    // }

    // console.log(state.url);



    // let userObservable = this.authService.user; ////substituído pelo 'NGRX'...


    let userObservable = this.store.select('auth');


    if (state.url === '/auth') {
      return userObservable.pipe(

        take(1),

        map(
          (user) => {
            // if (!user) { ///sem ngrx
              if (!user.token) { //com ngrx
              return true;
            } else {
              return this.router.createUrlTree(['/recipe-book']);
            }
          }
        )
      )

    }






    return userObservable.pipe( ///esse código foi alterado, agora vai funcionar com o observable de 'ngrx'...
        take(1),  ////usado para EVITAR COMPORTAMENTOS ESTRANHOS NO NOSSO APP, PARA fazer com que APENAS 1 ÚNICO VALUE DE 'user' SEJA EMITADO por nosso behavior subject, por 'RUN' de nossa authguard (depois de ser obtido o value desse subject, nesse run específico, o 'take(1)' força o UNSUBSCRIBE a esse subject aí)

        map(
          (user) => {
            // if (!user) { sem ngrx
              if (!user.token) {  //com ngrx

              // this.router.navigate(['/auth']); ////NÃO FAÇA ASSIM....
              // return false;
  
              return this.router.createUrlTree(['/auth']); ////FAÇA ASSIM... (crie e retorne uma url, com 'UrlTree', para direcionar/redirecionar o user em cases de 'unauth')
            } else {
              return true;
            }
          }
        )



    )




    //     ///código que funciona
    // return this.authService.user.pipe( ///esse código só funciona pq 'user' é um BEHAVIOR SUBJECT....
    //   take(1), ////usado para EVITAR COMPORTAMENTOS ESTRANHOS NO NOSSO APP, PARA fazer com que APENAS 1 ÚNICO VALUE DE 'user' SEJA EMITADO por nosso behavior subject, por 'RUN' de nossa authguard (depois de ser obtido o value desse subject, nesse run específico, o 'take(1)' força o UNSUBSCRIBE a esse subject aí)
  
    // map(
    //     (user) => {

    //         ///shortcut para esse código é '''return !!user;'''
    //       if (!user) {

    //         // this.router.navigate(['/auth']); ////NÃO FAÇA ASSIM....
    //         // return false;

    //         return this.router.createUrlTree(['/auth']); ////FAÇA ASSIM... (crie e retorne uma url, com 'UrlTree', para direcionar/redirecionar o user em cases de 'unauth')
    //       } else {
    //         return true;
    //       }
    //     }
    //   )

    // )














  //         //VELHA VERSÃO DO CÓDIGO DE 'REDIRECT A PARTIR DE USER IS NOT AUTH''''..... usa 'tap' em vez do return de 'UrlTree'...
  //   return this.authService.user.pipe( ///esse código só funciona pq 'user' é um BEHAVIOR SUBJECT....
  //   map(
  //     (user) => {

  //         ///shortcut para esse código é '''return !!user;'''
  //       if (!user) {

  //         this.router.navigate(['/auth']);
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     }
  //   ),
  //   tap(
  //     (isAuth: boolean) => {
      
  //         if(!isAuth) {
  //             this.router.navigate(['/auth']);
  //         } 
  //     }
  //   )

  // )




  }





}
