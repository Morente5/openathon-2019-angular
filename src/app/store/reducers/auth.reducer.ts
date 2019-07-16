import {
  Action,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as AuthActions from '../actions/auth.actions';
import { User, Credentials } from 'src/app/models/user';

export interface AuthState {
  user: User;
  errorMessage: string;
}

export const initialAuthState: AuthState = {
  user: null,
  errorMessage: null,
};

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.LOG_OUT, state => ({ ...state, user: null })),
  on(AuthActions.LOG_IN_SUCCESS, (state, { user }) => ({ ...state, user })),
  on(AuthActions.LOG_IN_SUCCESS_LS, (state, { user }) => ({ ...state, user })),
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}

export const authMetaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
