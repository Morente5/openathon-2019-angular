import { ImagesService } from './images.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { retry, switchMap, pluck, take } from 'rxjs/operators';

import { Event } from '../model/event';
import { environment } from '../../../environments/environment';
import { EventsStoreFacadeService } from '../store/services/events-store-facade.service';

@Injectable()
export class EventService {

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
    private http: HttpClient,
    private eventsFacade: EventsStoreFacadeService,
    private imagesService: ImagesService,
  ) { }

  /**
   * Gets the list of events
   */
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiURL}/events`, { headers: this.headers }).pipe(
      retry(3),
    );
  }

  /**
   * Gets an event provided its id
   *
   * @param id The id of the event
   */
  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiURL}/events/${id}`, { headers: this.headers }).pipe(
      retry(3),
    );
  }

  /**
   * Adds an event
   * it gets a random image for the event
   * and sets the current user email as `addedBy` property
   *
   * @param event The Event to add
   */
  addEvent(event: Event): Observable<Event> {
    const addedBy$ = this.eventsFacade.user$.pipe(
      pluck('email'),
      take(1),  // forkJoin needs the observable to complete
    );
    const imageUrl$ = this.imagesService.getImage();
    return forkJoin([addedBy$, imageUrl$]).pipe(
      switchMap(([addedBy, imageUrl]) => {
        return this.http.post<Event>(`${this.apiURL}/events`, { ...event, addedBy, imageUrl }, { headers: this.headers }).pipe(
          retry(3),
        );
      }),
    );
  }

  /**
   * Updates an event
   *
   * @param event The Event to update
   */
  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiURL}/events/${event.id}`, event, { headers: this.headers }).pipe(
      retry(3),
    );
  }

  /**
   * Deletes an event
   *
   * @param id The id of the event to delete
   */
  deleteEvent(id: string): Observable<Event> {
    return this.http.delete<Event>(`${this.apiURL}/events/${id}`, { headers: this.headers }).pipe(
      retry(3),
    );
  }

}
