import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Event } from '../model/event';
import { environment } from '../../../environments/environment';

@Injectable()
export class EventService {

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiURL}/events`, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getEvent(id: string): Observable<Event> {

    return this.http.get<Event>(`${environment.apiURL}/events/${id}`, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addEvent(event: Event): Observable<any> {

    return this.http
      .post(`${environment.apiURL}/events`, event, { headers: this.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  updateEvent(event: Event): Observable<any> {

    return this.http
      .put(`${environment.apiURL}/events/${event.id}`, event, { headers: this.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteEvent(id: string): Observable<any> {

    return this.http
      .delete(`${environment.apiURL}/events/${id}`, { headers: this.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
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
