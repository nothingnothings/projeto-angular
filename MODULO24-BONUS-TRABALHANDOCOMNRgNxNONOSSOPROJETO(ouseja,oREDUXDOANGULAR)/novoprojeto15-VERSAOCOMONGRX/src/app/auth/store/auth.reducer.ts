import * as AuthActions from '../store/authActions';

import { updateObject } from 'src/app/utility/updateObject';

export interface AuthState {
  token: string | null;
  userId: string | null;
  error: string | null;
  isLoading: boolean;
  email: string | null;
  expirationDate: Date | null;
}

// export interface AppState {
//   auth: AuthState;
// }

const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
  email: null,
  expirationDate: null
};

export function AuthReducer(
  state: AuthState = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTH_START: ///esses 2 cases dão no MESMO RESULTADO NO REDUCER, O RUN DE 'authStart'...
    case AuthActions.AUTH_SIGNUP_START:
      return authStart(state, action as AuthActions.AuthStart); ////isto e 'authStart' são a mesma coisa, possuem o mesmo efeito nesse reducer...
    // case AuthActions.AUTH_SIGNUP_START:
    //   return authSignupStart(state, action as AuthActions.AuthSignupStart); //isto e 'authStart' são a mesma coisa...
    case AuthActions.AUTH_SUCCESS:
      return authSuccess(state, action as AuthActions.AuthSuccess);
    case AuthActions.AUTH_FAIL:
      return authFail(state, action as AuthActions.AuthFail);
    case AuthActions.AUTH_LOGOUT:
      return authLogout(state, action as AuthActions.AuthLogout);
    case AuthActions.CLEAR_ERROR:
      return clearError(state, action as AuthActions.ClearError);
    default:
      return state;
  }
}

const authStart = (
  state: AuthState,
  action: AuthActions.AuthStart
): AuthState => {
  return updateObject(state, { isLoading: true, error: null });
};

// const authSignupStart = ( ///mesma coisa que o código de cima, por isso agrupamos as 2 actions em 1 só helper method, o de 'AuthStart'..
//   state: AuthState,
//   action: AuthActions.AuthSignupStart
// ): AuthState => {
//   return updateObject(state, { isLoading: true, error: null });
// };

const authSuccess = (
  state: AuthState,
  action: AuthActions.AuthSuccess
): AuthState => {
  const { token, email, userId, expirationDate } = action.payload;


  // console.log(action.payload);
  return updateObject(state, {
    isLoading: false,
    error: null, //resetta o nosso state...
    token: token,
    email: email,
    userId: userId,
    expirationDate: expirationDate
  });
};

const authFail = (
  state: AuthState,
  action: AuthActions.AuthFail
): AuthState => {
  return updateObject(state, {
    isLoading: false,
    token: null,
    email: null,
    userId: null,
    error: action.payload,
  });
};

const authLogout = (
  state: AuthState,
  action: AuthActions.AuthLogout
): AuthState => {
  // localStorage.removeItem('userData'); ///REMOVE A DATA DO USER DE SUA 'LOCALSTORAGE', aquela 'cookie' que fica lá.... //talvez esse seja um lugar ruim para colocar esse código ('side effect', não tem relação direta com o reducer, esse movimento)...

  return updateObject(state, {
    token: null,
    email: null,
    userId: null,
    expirationDate: null
  });
};

const clearError = (
  state: AuthState,
  action: AuthActions.ClearError
): AuthState => {
  return updateObject(state, {
    error: null,
  });
};
