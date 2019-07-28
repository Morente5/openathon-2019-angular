import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';

import { AppState, selectAuthUser } from 'src/app/store/app.state';
import { EventsState } from '../reducers/events.reducer';
import { selectEventsList, selectEventsListByUser, selectEvent } from '../events.state';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class EventsStoreFacadeService {

  public events$ = this.store.select(selectEventsList);

  public user$ = this.store.select(selectAuthUser);

  public myEvents$ = this.user$.pipe(
    switchMap(user => this.store.select(selectEventsListByUser(user.email))),
  );

  public selectEvent$ = (eventId) => this.store.select(selectEvent(eventId));


  constructor(private readonly store: Store<AppState>) { }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
