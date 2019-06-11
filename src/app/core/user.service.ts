import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, tap, pluck, filter } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  isAuthenticated: boolean;

  signup(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(`${environment.apiURL}/users`, user, { headers })
      .pipe(
        tap(usr => {
          localStorage.setItem('user', JSON.stringify(usr));
          this.setUser();
        }),
        retry(3),
        catchError(this.handleError),
      );
  }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<User>(`${environment.apiURL}/users`, { headers, params: { email: user.email } }).pipe(
      retry(3),
      pluck('0'),
      tap((usr: User) => {
        if (!usr || !usr.email) {
          throw new Error('This is not a valid email');
        }
        if (usr.password !== user.password) {
          throw new Error('Password not valid.');
        }
        if (usr.password === user.password) {
          localStorage.setItem('user', JSON.stringify(usr));
          this.setUser();
        }
      }),
      catchError(error => this.handleError(error)),
    );
  }

  logout() {
    localStorage.setItem('user', '');
    return false;
  }

  checkUser(): boolean {
    this.setUser();
    return this.isAuthenticated;
  }

  private setUser() {
    this.isAuthenticated = localStorage.getItem('user') ? true : false;
  }

  // Error handling

  private handleError(error: HttpErrorResponse) {
    this.logout();
    if (error instanceof Error) {
      return throwError(error.message);
    }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(`An error occurred: ${error.error.message}`);
    }
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    return throwError(`Backend returned code ${error.status}, body was: ${error.error}`);
  }
}
