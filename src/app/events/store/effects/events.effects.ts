import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EventsActions from '../actions/events.actions';
import { EventService } from '../../services/event.service';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState, selectEventsList } from '../events.state';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';



@Injectable()
export class EventsEffects {

  /**
   * Load Events effect
   *
   * Dispatches GET_EVENTS_SUCCESS when getEvents fetches events
   *
   * Dispatches GET_EVENTS_FAILURE when getEvents fetches invalid
   * events or getEvents throws an error
   * with an error message
   */
  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.GET_EVENTS),
      switchMap(_ => this.eventService.getEvents().pipe(
        map(events => {
          if (!events) {
            return EventsActions.GET_EVENTS_FAILURE({ errorMessage: 'An error has occurred.' });
          }
          return EventsActions.GET_EVENTS_SUCCESS({ events });
        }),
        catchError(_2 => of(EventsActions.GET_EVENTS_FAILURE({ errorMessage: 'An error has occurred.' }))),
      )),
    ),
  );

  /**
   * Get Event Details effect
   *
   * Dispatches GET_EVENTS when there are no events in the store
   */
  getEventDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.GET_EVENT_DETAIL),
      switchMap(_ => this.store.select(selectEventsList).pipe(
        map(events => {
          if (!events || !events.length) {
            return EventsActions.GET_EVENTS();
          }
          return EventsActions.NOOP();
        }),
      )),
    ),
  );

  /**
   * Create Event effect
   *
   * Dispatches CREATE_EVENT_SUCCESS when addEvent returns succesfully an event
   *
   * Dispatches CREATE_EVENT_FAILURE when addEvent throws an error
   * with an error message
   */
  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.CREATE_EVENT),
      switchMap(({ event }) => this.eventService.addEvent(event).pipe(
        map(selectedEvent => EventsActions.CREATE_EVENT_SUCCESS({ event: selectedEvent })),
        catchError(_ => of(EventsActions.CREATE_EVENT_FAILURE({ errorMessage: 'An error has occurred.' }))),
      )),
    ),
  );

  /**
   * Edit Event effect
   *
   * Dispatches EDIT_EVENT_SUCCESS when updateEvent returns succesfully an event
   *
   * Dispatches EDIT_EVENT_FAILURE when updateEvent throws an error
   * with an error message
   */
  editEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.EDIT_EVENT),
      switchMap(({ event }) => this.eventService.updateEvent(event).pipe(
        map(selectedEvent => EventsActions.EDIT_EVENT_SUCCESS({ event: selectedEvent })),
        catchError(_ => of(EventsActions.EDIT_EVENT_FAILURE({ errorMessage: 'An error has occurred.' }))),
      )),
    ),
  );

  /**
   * Delete Event effect
   *
   * Opens a confirmation dialog
   * When the user confirms, validates the operation on the service and dispatches DELETE_EVENT_SUCCESS
   * Dispatches DELETE_EVENT_FAILURE when the operation fails
   * Dispatches DELETE_EVENT_CANCEL when the user closes the confirmation dialog
   */
  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.DELETE_EVENT),
      switchMap(({ selectedEventId }) => {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: 'Are you sure you want to delete this event?',
            confirm: selectedEventId,
          },
        });
        return dialogRef.afterClosed();
      }),
      switchMap(result => {
        if (result && result.confirm) {
          return this.eventService.deleteEvent(result.confirm).pipe(
            map(_ => EventsActions.DELETE_EVENT_SUCCESS()),
            catchError(_ => of(EventsActions.DELETE_EVENT_FAILURE({ errorMessage: 'An error has occurred.' }))),
          );
        }
        return of(EventsActions.DELETE_EVENT_CANCEL());
      }),
    ),
  );

  /**
   * Delete Event Effect
   *
   * navigates to the event list
   */
  deleteEventSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.DELETE_EVENT_SUCCESS),
      tap(_ => this.router.navigate(['/events'])),
    ), { dispatch: false },
  );

  /**
   * Add/Edit Event Effect
   *
   * Dispatches GET_EVENTS
   * navigates to the event details
   */
  addEditEventSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.CREATE_EVENT_SUCCESS, EventsActions.EDIT_EVENT_SUCCESS),
      tap(({ event }) => this.router.navigate(['/events', event.id])),
      map(_ => EventsActions.GET_EVENTS()),
    ),
  );

  /**
   * Error message Effect
   *
   * Opens a Snack Bar with the error message
   */
  errorMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EventsActions.GET_EVENTS_FAILURE,
        EventsActions.CREATE_EVENT_FAILURE,
        EventsActions.EDIT_EVENT_FAILURE,
        EventsActions.DELETE_EVENT_FAILURE,
      ),
      tap(({ errorMessage }) => this.snackBar.open(errorMessage)),
    ), { dispatch: false }
  );


  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly store: Store<AppState>,
    private readonly eventService: EventService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}

}
