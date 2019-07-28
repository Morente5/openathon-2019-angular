import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { eventsReducer, EventsState } from './reducers/events.reducer';

/**
 * The Main App State (for EventsModule)
 */
export interface AppState {
  events: EventsState;
}

/**
 * App reducers (for EventsModule)
 */
export const reducers: ActionReducerMap<AppState> = {
  events: eventsReducer,
};

/**
 * Selects EventsState from Store
 */
export const getEventsState = createFeatureSelector('events');

/**
 * Selects events from EventsState
 */
export const selectEventsList = createSelector(
  getEventsState,
  (state: EventsState) => state.events
);

/**
 * Selects an event from EventsState by id
 *
 * @param eventId The id of the event
 */
export const selectEvent = (eventId) => createSelector(
  getEventsState,
  (state: EventsState) => state.events.find(event => event.id === eventId),
);

/**
 * Selects the events added by a user
 *
 * @param email The email of the user
 */
export const selectEventsListByUser = (email) => createSelector(
  getEventsState,
  (state: EventsState) => state.events.filter(event => event.addedBy === email),
);
