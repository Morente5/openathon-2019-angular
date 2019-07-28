import { Credentials } from '../../model/user';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap, pluck, switchMap } from 'rxjs/operators';
import { User } from '../../model/user';
import { environment } from '../../../environments/environment';

import { AuthStoreFacadeService } from 'src/app/store/services/auth-store-facade.service';
import * as AuthActions from '../../store/actions/auth.actions';

@Injectable()
export class AuthService {

  public user$ = this.authFacade.user$;

  apiURL = environment.apiURL;

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private readonly http: HttpClient,
    private readonly authFacade: AuthStoreFacadeService,
  ) {
    const userLS = this.getUserFromLS();
    if (userLS) {
      this.authFacade.dispatch(AuthActions.LOG_IN_SUCCESS_LS({ user: userLS }));
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
    return this.http.get<User>(`${this.apiURL}/users`, { headers, params: { email: user.email } }).pipe(
      retry(3),
      pluck('0'),
    );
  }

  postUser(user: Credentials): Observable<User> {
    const headers = this.headers;
    return this.http.post<User>(`${this.apiURL}/users`, user, { headers }).pipe(
      retry(3),
    );
  }

  logout() {
    this.authFacade.dispatch(AuthActions.LOG_OUT());
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
