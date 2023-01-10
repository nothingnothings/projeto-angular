import * as AuthActions from './authActions';

import { updateObject } from 'src/app/utility/updateObject';

export interface AuthState {
  token: string | null;
  userId: string | null;
  error: string | null;
  isLoading: boolean;
  email: string | null;
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
};

export function AuthReducer(
  state: AuthState = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTH_START:
      return authStart(state, action as AuthActions.AuthStart);
    case AuthActions.AUTH_SUCCESS:
      return authSuccess(state, action as AuthActions.AuthSuccess);
    case AuthActions.AUTH_FAIL:
      return authFail(state, action as AuthActions.AuthFail);
    case AuthActions.AUTH_LOGOUT:
      return authLogout(state, action as AuthActions.AuthLogout);
      default:
        return state;
  }
}

const authStart = (
  state: AuthState,
  action: AuthActions.AuthStart
): AuthState => {
  return updateObject(state, { isLoading: true });
};

const authSuccess = (
  state: AuthState,
  action: AuthActions.AuthSuccess
): AuthState => {
  const { token, email, id } = action.payload;

  return updateObject(state, {
    isLoading: false,
    token: token,
    email: email,
    userId: id,
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
  });
};

const authLogout = (
  state: AuthState,
  action: AuthActions.AuthLogout
): AuthState => {



    localStorage.removeItem('userData'); ///REMOVE A DATA DO USER DE SUA 'LOCALSTORAGE', aquela 'cookie' que fica lá.... //talvez esse seja um lugar ruim para colocar esse código ('side effect', não tem relação direta com o reducer, esse movimento)...

  return updateObject(state, {
    token: null,
    email: null,
    userId: null,
  });
};
