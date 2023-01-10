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

const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
  email: null,
  expirationDate: null,
};

export function AuthReducer(
  state: AuthState = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTH_START:
    case AuthActions.AUTH_SIGNUP_START:
      return authStart(state, action as AuthActions.AuthStart);
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

const authSuccess = (
  state: AuthState,
  action: AuthActions.AuthSuccess
): AuthState => {
  const { token, email, userId, expirationDate } = action.payload;

  return updateObject(state, {
    isLoading: false,
    error: null,
    token: token,
    email: email,
    userId: userId,
    expirationDate: expirationDate,
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
  return updateObject(state, {
    token: null,
    email: null,
    userId: null,
    expirationDate: null,
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
