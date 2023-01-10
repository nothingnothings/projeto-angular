import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const AUTH_START = '[Auth] AUTH_START';

export const AUTH_FAIL = '[Auth] AUTH_FAIL';

export const AUTH_SIGNUP_START = '[Auth] AUTH_SIGNUP_START';

export const AUTH_SUCCESS = '[Auth] AUTH_SUCCESS';

export const AUTH_LOGOUT = '[Auth] AUTH_LOGOUT';


export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';

export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';

export const DUMMY = '[Auth] DUMMY';

// export class AuthStart implements Action {  ///versão REACT (só usado para trocar isLoading para true)...
//   readonly type = AUTH_START;

//   constructor() {}
// }


export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;


  constructor() {}
}


export class AuthStart implements Action {
  readonly type = AUTH_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) {} ////vai segurar 'error', que será uma STRING (ou um object error).
}

export class AuthLogout {
  readonly type = AUTH_LOGOUT;
  ///temos que remover os items no localStorage, por meio de algum helper method, nos effects, provavelmente (melhor practice)...
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: {
    email: string,
    userId: string,
    token: string,
    expirationDate: Date,
    isRedirect: boolean
  }) {}
}

export class AuthSignupStart implements Action {
  readonly type = AUTH_SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}  //o payload é usado lá nos nossos 'effects'...
}






export class ClearError implements Action {

  readonly type = CLEAR_ERROR;


  constructor() {}


}


export class DummyAction implements Action {
  readonly type = DUMMY;




  
}




export type AuthActions =
  | AuthStart
  | AuthFail
  | AuthLogout
  | AuthSuccess
  | AuthSignupStart
  | ClearError
  | AutoLogin