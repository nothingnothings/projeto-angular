import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const AUTH_START = '[Auth] AUTH_START';

export const AUTH_FAIL = '[Auth] AUTH_FAIL';

export const AUTH_SUCCESS = '[Auth] AUTH_SUCCESS';

export const AUTH_LOGOUT = '[Auth] AUTH_LOGOUT';

export class AuthStart implements Action {
  readonly type = AUTH_START;

  constructor() {}
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(private payload: string) {} ////vai segurar 'error', que será uma STRING (ou um object error).
}

export class AuthLogout {
  readonly type = AUTH_LOGOUT;
  ///temos que remover os items no localStorage, por meio de algum helper method, no reducer...
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: User) {}
}

export type AuthActions = AuthStart | AuthFail | AuthLogout | AuthSuccess;
