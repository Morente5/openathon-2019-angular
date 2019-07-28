import {
  ActionReducerMap,
  createSelector,
} from '@ngrx/store';

import { AuthState, authReducer } from './reducers/auth.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  auth: AuthState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  router: routerReducer,
};

export const selectAuth = (state: AppState) => state.auth;

export const selectAuthUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);
