import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { Router } from '@angular/router';
import { AppState } from '..';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let userObservable = this.store.select('auth');

    if (state.url === '/auth') {
      return userObservable.pipe(
        take(1),

        map((user) => {
          if (!user.token) {
            return true;
          } else {
            return this.router.createUrlTree(['/recipe-book']);
          }
        })
      );
    }

    return userObservable.pipe(
      take(1),

      map((user) => {
        if (!user.token) {
          return this.router.createUrlTree(['/auth']);
        } else {
          return true;
        }
      })
    );
  }
}
