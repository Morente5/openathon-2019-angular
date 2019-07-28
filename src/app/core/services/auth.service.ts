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

  /**
   * Observable of the authenticated user
   */
  public user$ = this.authFacade.user$;

  /**
   * The headers for the requests
   */
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /**
   * The base URL the requests
   */
  apiURL = environment.apiURL;

  constructor(
    private readonly http: HttpClient,
    private readonly authFacade: AuthStoreFacadeService,
  ) {
    const userLS = this.getUserFromLS();
    if (userLS) {
      this.authFacade.dispatch(AuthActions.LOG_IN_SUCCESS_LS({ user: userLS }));
    }
  }

  /**
   * Logins an user
   *
   * @param user The user log in
   */
  login(user: Credentials): Observable<User> {
    return this.getUser(user);
  }

  /**
   * Checks an user before registration
   *
   * @param user The user to check
   */
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

  /**
   * Gets an user
   *
   * @param user The user credentials for the user to get
   */
  getUser(user: Credentials): Observable<User> {
    const headers = this.headers;
    return this.http.get<User>(`${this.apiURL}/users`, { headers, params: { email: user.email } }).pipe(
      retry(3),
      pluck('0'),
    );
  }

  /**
   * Register an user
   *
   * @param user The user to add
   */
  postUser(user: Credentials): Observable<User> {
    const headers = this.headers;
    return this.http.post<User>(`${this.apiURL}/users`, user, { headers }).pipe(
      retry(3),
    );
  }

  /**
   * Dispatches LOG_OUT
   */
  logout() {
    this.authFacade.dispatch(AuthActions.LOG_OUT());
  }

  /**
   * Gets the user from Local Storage
   * returns null if there is none or it is invalid
   *
   * @return a valid user or null
   */
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
