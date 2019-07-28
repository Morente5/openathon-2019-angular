import { Event } from '../../model/event';
import { createAction, props } from '@ngrx/store';

export const GET_EVENTS = createAction(
  '[Events] Get Events',
);
export const DONT_GET_EVENTS = createAction(
  '[Events] Dont Get Events',
);

export const GET_EVENTS_SUCCESS = createAction(
  '[Events] Get Events Success',
  props<{ events: Event[] }>()
);

export const GET_EVENTS_FAILURE = createAction(
  '[Events] Get Events Failure',
  props<{ errorMessage: string }>()
);

export const GET_EVENT_DETAIL = createAction(
  '[Events] Get Event Detail',
  props<{ selectedEventId: string }>()
);

export const CREATE_EVENT = createAction(
  '[Events] Create Event',
  props<{ event: Event }>(),
);

export const CREATE_EVENT_SUCCESS = createAction(
  '[Events] Create Event Success',
  props<{ event: Event }>()
);

export const CREATE_EVENT_FAILURE = createAction(
  '[Events] Create Event Failure',
  props<{ errorMessage: string }>()
);

export const EDIT_EVENT = createAction(
  '[Events] Edit Event',
  props<{ event: Event }>(),
);

export const EDIT_EVENT_SUCCESS = createAction(
  '[Events] Edit Event Success',
  props<{ event: Event }>()
);

export const EDIT_EVENT_FAILURE = createAction(
  '[Events] Edit Event Failure',
  props<{ errorMessage: string }>()
);

export const DELETE_EVENT = createAction(
  '[Events] Delete Event',
  props<{ selectedEventId: string }>(),
);

export const DELETE_EVENT_SUCCESS = createAction(
  '[Events] Delete Event Success',
);
export const DELETE_EVENT_FAILURE = createAction(
  '[Events] Delete Event Failure',
  props<{ errorMessage: string }>(),
);
export const DELETE_EVENT_CANCEL = createAction(
  '[Events] Delete Event Cancel',
);


export const NOOP = createAction(
  '[Events] NoopAction',
);
