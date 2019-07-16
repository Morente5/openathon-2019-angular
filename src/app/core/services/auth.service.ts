import { AppState, selectAuthUser } from './../../store/app.state';
import { Credentials } from './../../models/user';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap, pluck, switchMap } from 'rxjs/operators';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';

import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$ = this.store.select(selectAuthUser);

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<AppState>,
  ) {
    const user = this.getUserFromLS();
    if (user) {
      this.store.dispatch(AuthActions.LOG_IN_SUCCESS_LS({ user }));
    }
  }

  login(user: Credentials): Observable<User> {
    return this.getUser(user);
  }
  signup(user: Credentials): Observable<User> {
    return this.getUser(user).pipe(
      switchMap(userWithSameEmail => {
        if (!userWithSameEmail) {
          return this.postUser(user);
        }
        return of(null);
      }),
    );
  }


  getUser(user: Credentials): Observable<User> {
    const headers = this.headers;
    return this.http.get<User>(`${environment.apiURL}/users`, { headers, params: { email: user.email } }).pipe(
      retry(3),
      pluck('0'),
    );
  }

  postUser(user: Credentials): Observable<User> {
    const headers = this.headers;
    return this.http.post<User>(`${environment.apiURL}/users`, user, { headers }).pipe(
      retry(3),
    );
  }

  logout() {
    this.store.dispatch(AuthActions.LOG_OUT());
  }

  getUserFromLS(): User {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user);
      } catch {
        return null;
      }
    }
    return null;
  }

}
