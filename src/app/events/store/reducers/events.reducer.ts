import {
  Action,
  createReducer,
  on,
} from '@ngrx/store';

import { Event } from '../../model/event';

import * as EventsActions from '../actions/events.actions';

/**
 * The events state
 */
export interface EventsState {
  events: Event[];
}

/**
 * Initial events state
 */
export const initialEventsState: EventsState = {
  events: [],
};

/**
 * Events reducer creator
 */
const reducer = createReducer(
  initialEventsState,
  on(EventsActions.GET_EVENTS_SUCCESS, (state, { events }) => ({ ...state, events })),
);

/**
 * Events reducer
 */
export function eventsReducer(state: EventsState | undefined, action: Action): EventsState {
  return reducer(state, action);
}
