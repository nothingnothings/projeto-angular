import { Injectable } from '@angular/core';

exhaustMap;

import { BehaviorSubject, catchError, exhaustMap, Subject, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '..';

import * as fromAuthActions from '../auth/store/authActions';

export interface AuthResponseData {
  kind: string;
  email: string;
  refreshToken: string;
  idToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenExpirationTimer: any;

  constructor(private store: Store<AppState>) {}

  setLogoutTimer(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new fromAuthActions.AuthLogout());
    }, expirationTime * 1000);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);

      this.tokenExpirationTimer = null;
    }
  }
}
