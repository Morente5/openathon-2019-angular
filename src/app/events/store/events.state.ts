import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { eventsReducer, EventsState } from './reducers/events.reducer';

export interface AppState {
  events: EventsState;
}

export const reducers: ActionReducerMap<AppState> = {
  events: eventsReducer,
};


export const getEventsState = createFeatureSelector('events');

export const selectEventsList = createSelector(
  getEventsState,
  (state: EventsState) => state.events
);

export const selectEvent = (eventId) => createSelector(
  getEventsState,
  (state: EventsState) => state.events.find(event => event.id === eventId),
);

export const selectEventsListByUser = (email) => createSelector(
  getEventsState,
  (state: EventsState) => state.events.filter(event => event.addedBy === email),
);
