import { Credentials } from '../../model/user';
import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/model/user';

export const LOG_IN = createAction(
  '[Auth] Log In',
  props<{ credentials: Credentials }>()
);
export const LOG_OUT = createAction(
  '[Auth] Log Out',
);

export const LOG_IN_SUCCESS = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const LOG_IN_SUCCESS_LS = createAction(
  '[Auth] Login Success from Local Storage',
  props<{ user: User }>()
);

export const LOG_IN_FAILURE = createAction(
  '[Auth] Login Failure',
  props<{ errorMessage: string }>()
);

export const SIGN_UP = createAction(
  '[Auth] Sign Up',
  props<{ credentials: Credentials }>()
);

export const SIGN_UP_SUCCESS = createAction(
  '[Auth] Sign Up Success',
  props<{ user: User }>()
);

export const SIGN_UP_FAILURE = createAction(
  '[Auth] Sign Up Failure',
  props<{ errorMessage: string }>()
);
