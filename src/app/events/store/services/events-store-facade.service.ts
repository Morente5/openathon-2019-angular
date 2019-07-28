import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';

import { AppState, selectAuthUser } from 'src/app/store/app.state';
import { EventsState } from '../reducers/events.reducer';
import { selectEventsList, selectEventsListByUser, selectEvent } from '../events.state';
import { switchMap, map } from 'rxjs/operators';

/**
 * Events Facade Service.
 * Handles any interaction with the store.
 * When a component needs to dispatch an action or get the
 * result of a selector, it would instead call
 * the appropriate methods on the facade service.
 *
 * This service exposes the store, some actions, and some reducers
 */
@Injectable()
export class EventsStoreFacadeService {

  /**
   * Observable of the events
   */
  public events$ = this.store.select(selectEventsList);

  /**
   * Observable of the authenticated user
   */
  public user$ = this.store.select(selectAuthUser);

  /**
   * Observable of the events created by the authenticated user
   */
  public myEvents$ = this.user$.pipe(
    switchMap(user => this.store.select(selectEventsListByUser(user.email))),
  );

  /**
   * Returns an observable of the event whose id matches
   * the one provided as a parameter
   *
   * @param eventId The id of the event
   */
  public selectEvent$(eventId) {
    return this.store.select(selectEvent(eventId));
  }


  constructor(private readonly store: Store<AppState>) { }

  /**
   * Dispatch the provided action on the store
   *
   * @param action The action to dispatch
   */
  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
