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

  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.CREATE_EVENT),
      switchMap(({ event }) => this.eventService.addEvent(event).pipe(
        map(selectedEvent => EventsActions.CREATE_EVENT_SUCCESS({ event: selectedEvent })),
        catchError(_ => of(EventsActions.CREATE_EVENT_FAILURE({ errorMessage: 'An error has occurred.' }))),
      )),
    ),
  );
  editEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.EDIT_EVENT),
      switchMap(({ event }) => this.eventService.updateEvent(event).pipe(
        map(selectedEvent => EventsActions.EDIT_EVENT_SUCCESS({ event: selectedEvent })),
        catchError(_ => of(EventsActions.EDIT_EVENT_FAILURE({ errorMessage: 'An error has occurred.' }))),
      )),
    ),
  );

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

  deleteEventSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.DELETE_EVENT_SUCCESS),
      tap(_ => this.router.navigate(['/events'])),
    ), { dispatch: false },
  );

  addEditEventSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.CREATE_EVENT_SUCCESS, EventsActions.EDIT_EVENT_SUCCESS),
      tap(({ event }) => this.router.navigate(['/events', event.id])),
      map(_ => EventsActions.GET_EVENTS()),
    ),
  );

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
