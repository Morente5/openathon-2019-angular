import {
  ActionReducerMap,
  createSelector,
} from '@ngrx/store';

import { AuthState, authReducer } from './reducers/auth.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

/**
 * The Main App State
 */
export interface AppState {
  auth: AuthState;
  router: RouterReducerState;
}

/**
 * App reducers
 */
export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  router: routerReducer,
};

/**
 * Selects auth from Store
 */
const selectAuth = (state: AppState) => state.auth;

/**
 * Selects user from AuthState
 */
export const selectAuthUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);
