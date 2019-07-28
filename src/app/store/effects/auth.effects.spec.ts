import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, throwError, ReplaySubject } from 'rxjs';

import { AuthEffects } from './auth.effects';

import * as AuthActions from '../actions/auth.actions';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';

const authServiceStub = {
  user$: of({
    id: '1',
    email: 'email',
    password: 'pass',
  }),
  login: () => of(),
  signup: () => of(),
};

describe('AuthEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: AuthEffects;
  let authService: AuthService;
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        AuthEffects,
        { provide: AuthService, useValue: authServiceStub },
        provideMockActions(() => actions$),
      ]
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
    actions$ = new ReplaySubject(1);
    router = TestBed.get(Router);
    snackBar = TestBed.get(MatSnackBar);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('login$', () => {
    it('should dispatch LOG_IN_SUCCESS when the credentials are valid', () => {
      const credentials = { email: 'email', password: 'pass' };
      const user = { email: 'email', password: 'pass', id: '1' };

      const action = AuthActions.LOG_IN({ credentials });
      const completion = AuthActions.LOG_IN_SUCCESS({ user });

      spyOn(authService, 'login').and.returnValue(of(user));

      actions$.next(action);
      effects.login$.subscribe(result => expect(result).toEqual(completion));
    });

    it('should dispatch LOG_IN_FAILURE when the credentials have no email', () => {
      const credentials = { email: '', password: 'pass' };
      const user = { email: '', password: 'pass', id: '1' };

      const action = AuthActions.LOG_IN({ credentials });
      const completion = AuthActions.LOG_IN_FAILURE({ errorMessage: 'This is not a valid user.' });

      spyOn(authService, 'login').and.returnValue(of(user));

      actions$.next(action);
      effects.login$.subscribe(result => expect(result).toEqual(completion));
    });

    it('should dispatch LOG_IN_FAILURE when the password is not correct', () => {
      const credentials = { email: 'email', password: 'pass' };
      const user = { email: 'email', password: 'otherPass', id: '1' };

      const action = AuthActions.LOG_IN({ credentials });
      const completion = AuthActions.LOG_IN_FAILURE({ errorMessage: 'This is not a valid password.' });

      spyOn(authService, 'login').and.returnValue(of(user));

      actions$.next(action);
      effects.login$.subscribe(result => expect(result).toEqual(completion));
    });

    it('should dispatch LOG_IN_FAILURE when login throws an error', () => {
      const credentials = { email: 'email', password: 'pass' };

      const action = AuthActions.LOG_IN({ credentials });
      const completion = AuthActions.LOG_IN_FAILURE({ errorMessage: 'An error has occurred.' });

      spyOn(authService, 'login').and.returnValue(throwError(new Error()));

      actions$.next(action);
      effects.login$.subscribe(result => expect(result).toEqual(completion));
    });

  });


  describe('signup$', () => {
    it('should dispatch SIGN_UP_SUCCESS when the credentials are valid', () => {
      const credentials = { email: 'email', password: 'pass' };
      const user = { email: 'email', password: 'pass', id: '1' };

      const action = AuthActions.SIGN_UP({ credentials });
      const completion = AuthActions.SIGN_UP_SUCCESS({ user });

      spyOn(authService, 'signup').and.returnValue(of(user));

      actions$.next(action);
      effects.signup$.subscribe(result => expect(result).toEqual(completion));
    });

    it('should dispatch SIGN_UP_FAILURE when user is already registered', () => {
      const credentials = { email: 'email', password: 'pass' };
      const user = null;

      const action = AuthActions.SIGN_UP({ credentials });
      const completion = AuthActions.SIGN_UP_FAILURE({ errorMessage: 'This user is already registered.' });

      spyOn(authService, 'signup').and.returnValue(of(user));

      actions$.next(action);
      effects.signup$.subscribe(result => expect(result).toEqual(completion));
    });

    it('should dispatch SIGN_UP_FAILURE when signup throws an error', () => {
      const credentials = { email: 'email', password: 'pass' };

      const action = AuthActions.SIGN_UP({ credentials });
      const completion = AuthActions.SIGN_UP_FAILURE({ errorMessage: 'An error has occurred.' });

      spyOn(authService, 'signup').and.returnValue(throwError(new Error()));

      actions$.next(action);
      effects.signup$.subscribe(result => expect(result).toEqual(completion));
    });

  });


  describe('signupSuccess$', () => {
    it('should dispatch LOG_IN_SUCCESS when the user is successfully registered', () => {
      const user = { email: 'email', password: 'pass', id: '1' };

      const action = AuthActions.SIGN_UP_SUCCESS({ user });
      const completion = AuthActions.LOG_IN_SUCCESS({ user });

      actions$.next(action);
      effects.signupSuccess$.subscribe(result => expect(result).toEqual(completion));
    });

  });


  describe('loginSuccess$', () => {
    it('should navigate to /events when user logs in successfully', () => {
      const user = { email: 'email', password: 'pass', id: '1' };

      const action = AuthActions.LOG_IN_SUCCESS({ user });

      spyOn(router, 'navigate');

      actions$.next(action);
      effects.loginSuccess$.subscribe(_ => {
        expect(router.navigate).toHaveBeenCalledWith(['/events']);
      });
    });

  });

  describe('logout$', () => {
    it('should navigate to /home when user logs out', () => {
      const action = AuthActions.LOG_OUT();

      spyOn(router, 'navigate');

      actions$.next(action);
      effects.logout$.subscribe(_ => {
        expect(router.navigate).toHaveBeenCalledWith(['/home']);
      });
    });

  });

  describe('errorMessage$', () => {
    it('should open the snack bar with the error message', () => {
      const errorMessage = 'error';
      const action = AuthActions.LOG_IN_FAILURE({ errorMessage });

      spyOn(snackBar, 'open');

      actions$.next(action);
      effects.errorMessage$.subscribe(_ => {
        expect(snackBar.open).toHaveBeenCalledWith(errorMessage);
      });
    });

  });

});
