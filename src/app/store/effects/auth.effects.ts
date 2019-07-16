import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOG_IN),
      switchMap(({credentials}) => this.authService.login(credentials).pipe(
        map(user => {
          if (!user || !user.email) {
            return AuthActions.LOG_IN_FAILURE({ errorMessage: 'This is not a valid user.' });
          }
          if (credentials.password !== user.password) {
            return AuthActions.LOG_IN_FAILURE({ errorMessage: 'This is not a valid password.' });
          }
          return AuthActions.LOG_IN_SUCCESS({ user });
        }),
        catchError(_ => of(AuthActions.LOG_IN_FAILURE({ errorMessage: 'An error has occurred.' }))),
      )),
    )
  );
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGN_UP),
      switchMap(({credentials}) => this.authService.signup(credentials).pipe(
        map(user => {
          if (!user) {
            return AuthActions.SIGN_UP_FAILURE({ errorMessage: 'This user is already registered.' });
          }
          return AuthActions.SIGN_UP_SUCCESS({ user });
        }),
        catchError(_ => of(AuthActions.SIGN_UP_FAILURE({ errorMessage: 'An error has occurred.' }))),
      )),
    )
  );

  signupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGN_UP_SUCCESS),
      map(({ user }) => {
        return AuthActions.LOG_IN_SUCCESS({ user });
      }),
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOG_IN_SUCCESS),
      tap(({ user }) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/events']);
      }),
    ), { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOG_OUT),
      tap(_ => {
        localStorage.removeItem('user');
        this.router.navigate(['/home']);
      }),
    ), { dispatch: false }
  );

  errorMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOG_IN_FAILURE, AuthActions.SIGN_UP_FAILURE),
      tap(({ errorMessage }) => this.snackBar.open(errorMessage)),
    ), { dispatch: false }
  );


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

}
