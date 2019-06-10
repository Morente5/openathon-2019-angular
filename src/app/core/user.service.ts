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
      .post(`${environment.apiURL}users`, user, { headers })
      .pipe(
        retry(3),
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.setUser();
        }),
        catchError(this.handleError),
      );
  }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<User>(`${environment.apiURL}users`, { headers, params: { email: user.email } }).pipe(
      retry(3),
      pluck('0'),
      filter((usr: User) => !!usr.email),
      tap(usr => {
        localStorage.setItem('user', JSON.stringify(usr));
        this.setUser();
      }),
      map(usr => {
        if (usr.password === user.password) {
          return usr;
        }
        throw new Error('Password not valid.');
      }),
      catchError(this.handleError),
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
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
