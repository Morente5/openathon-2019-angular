import {
  Action,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';

import { environment } from '../../../../environments/environment';

import { Event } from '../../model/event';

import * as EventsActions from '../actions/events.actions';

export interface EventsState {
  events: Event[];
}

export const initialEventsState: EventsState = {
  events: [],
};

const reducer = createReducer(
  initialEventsState,
  on(EventsActions.GET_EVENTS_SUCCESS, (state, { events }) => ({ ...state, events })),
);

export function eventsReducer(state: EventsState | undefined, action: Action): EventsState {
  return reducer(state, action);
}
