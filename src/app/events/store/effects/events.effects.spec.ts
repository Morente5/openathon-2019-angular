import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject, throwError, EMPTY, Observable } from 'rxjs';

import { EventsEffects } from './events.effects';
import * as EventsActions from '../actions/events.actions';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Action, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { AppState } from '../events.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';


const eventMock = {
  title: 'myTitle',
  location: '',
  date: new Date('2000-01-01'),
  description: '',
  addedBy: '',
  imageUrl: '',
  id: '4',
};

const eventServiceStub = {
  getEvents: () => EMPTY,
  addEvent: () => EMPTY,
  updateEvent: () => EMPTY,
  deleteEvent: () => EMPTY,
};

describe('EventsEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: EventsEffects;
  let store: MockStore<{ events: Event[] }>;
  const initialState = { events: [] };
  let eventService: EventService;
  let router: Router;
  let snackBar: MatSnackBar;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
      providers: [
        EventsEffects,
        { provide: EventService, useValue: eventServiceStub },
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ]
    });

    effects = TestBed.get(EventsEffects);
    eventService = TestBed.get(EventService);
    actions$ = new ReplaySubject(1);
    store = TestBed.get<Store<AppState>>(Store);
    router = TestBed.get(Router);
    snackBar = TestBed.get(MatSnackBar);
    dialog = TestBed.get(MatDialog);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadEvents$', () => {
    it('should dispatch GET_EVENTS_SUCCESS when getEvents fetches events', () => {
      const events = [];

      const action = EventsActions.GET_EVENTS();
      const completion = EventsActions.GET_EVENTS_SUCCESS({ events });

      spyOn(eventService, 'getEvents').and.returnValue(of(events));

      actions$.next(action);
      effects.loadEvents$.subscribe(result => expect(result).toEqual(completion));
    });
    it('should dispatch GET_EVENTS_FAILURE when getEvents fetches invalid events', () => {
      const errorMessage = 'An error has occurred.';

      const action = EventsActions.GET_EVENTS();
      const completion = EventsActions.GET_EVENTS_FAILURE({ errorMessage });

      spyOn(eventService, 'getEvents').and.returnValue(of(null));

      actions$.next(action);
      effects.loadEvents$.subscribe(result => expect(result).toEqual(completion));
    });
    it('should dispatch GET_EVENTS_FAILURE when getEvents throws an error', () => {
      const errorMessage = 'An error has occurred.';

      const action = EventsActions.GET_EVENTS();
      const completion = EventsActions.GET_EVENTS_FAILURE({ errorMessage });

      spyOn(eventService, 'getEvents').and.returnValue(throwError(new Error()));

      actions$.next(action);
      effects.loadEvents$.subscribe(result => {
        expect(result).toEqual(completion);
      });
    });
  });

  describe('getEventDetail$', () => {
    it('should dispatch GET_EVENTS when there are no events in the store', () => {
      const selectedEventId = 'id';
      const events = [];

      const action = EventsActions.GET_EVENT_DETAIL({ selectedEventId });
      const completion = EventsActions.GET_EVENTS();

      spyOn(store, 'select').and.returnValue(of(null));


      actions$.next(action);
      effects.getEventDetail$.subscribe(result => expect(result).toEqual(completion));
    });
    it('should dispatch NOOP (nothing) when there are events in the store', () => {
      const selectedEventId = 'id';
      const events = [eventMock];

      const action = EventsActions.GET_EVENT_DETAIL({ selectedEventId });
      const completion = EventsActions.NOOP();

      spyOn(store, 'select').and.returnValue(of(events));


      actions$.next(action);
      effects.getEventDetail$.subscribe(result => expect(result).toEqual(completion));
    });
  });
  describe('createEvent$', () => {
    it('should dispatch CREATE_EVENT_SUCCESS when addEvent returns succesfully an event', () => {

      const action = EventsActions.CREATE_EVENT({ event: eventMock });
      const completion = EventsActions.CREATE_EVENT_SUCCESS({ event: eventMock });

      spyOn(eventService, 'addEvent').and.returnValue(of(eventMock));


      actions$.next(action);
      effects.createEvent$.subscribe(result => expect(result).toEqual(completion));
    });
    it('should dispatch CREATE_EVENT_FAILURE when addEvent throws an error', () => {
      const errorMessage = 'An error has occurred.';
      const action = EventsActions.CREATE_EVENT({ event: eventMock });
      const completion = EventsActions.CREATE_EVENT_FAILURE({ errorMessage });

      spyOn(eventService, 'addEvent').and.returnValue(throwError(new Error()));


      actions$.next(action);
      effects.createEvent$.subscribe(result => expect(result).toEqual(completion));
    });
  });
  describe('editEvent$', () => {
    it('should dispatch EDIT_EVENT_SUCCESS when updateEvent returns succesfully an event', () => {

      const action = EventsActions.EDIT_EVENT({ event: eventMock });
      const completion = EventsActions.EDIT_EVENT_SUCCESS({ event: eventMock });

      spyOn(eventService, 'updateEvent').and.returnValue(of(eventMock));

      actions$.next(action);
      effects.editEvent$.subscribe(result => expect(result).toEqual(completion));
    });
    it('should dispatch EDIT_EVENT_FAILURE when updateEvent throws an error', () => {
      const errorMessage = 'An error has occurred.';
      const action = EventsActions.EDIT_EVENT({ event: eventMock });
      const completion = EventsActions.EDIT_EVENT_FAILURE({ errorMessage });

      spyOn(eventService, 'updateEvent').and.returnValue(throwError(new Error()));

      actions$.next(action);
      effects.editEvent$.subscribe(result => expect(result).toEqual(completion));
    });
  });

  describe('deleteEvent$', () => {
    it('should dispatch DELETE_EVENT_SUCCESS when user confirms the dialog and returns deleted', () => {

      const action = EventsActions.DELETE_EVENT({ selectedEventId: '3'});
      const completion = EventsActions.DELETE_EVENT_SUCCESS();

      spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of({ confirm: 3 }) } as MatDialogRef<any, any>);

      spyOn(eventService, 'deleteEvent').and.returnValue(of(eventMock));

      actions$.next(action);
      effects.deleteEvent$.subscribe(result => {
        expect(dialog.open).toHaveBeenCalled();
        expect(result).toEqual(completion);
      });
    });
    it('should dispatch DELETE_EVENT_FAILURE when user confirms the dialog and throws an error', () => {
      const errorMessage = 'An error has occurred.';

      const action = EventsActions.DELETE_EVENT({ selectedEventId: '3' });
      const completion = EventsActions.DELETE_EVENT_FAILURE({ errorMessage });

      spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of({ confirm: 3 }) } as MatDialogRef<any, any>);

      spyOn(eventService, 'deleteEvent').and.returnValue(throwError(new Error()));

      actions$.next(action);
      effects.deleteEvent$.subscribe(result => {
        expect(dialog.open).toHaveBeenCalled();
        expect(result).toEqual(completion);
      });
    });

    it('should dispatch DELETE_EVENT_CANCEL when user dismisses the dialog', () => {

      const action = EventsActions.DELETE_EVENT({ selectedEventId: '3' });
      const completion = EventsActions.DELETE_EVENT_CANCEL();

      spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of({ }) } as MatDialogRef<any, any>);

      actions$.next(action);
      effects.deleteEvent$.subscribe(result => {
        expect(dialog.open).toHaveBeenCalled();
        expect(result).toEqual(completion);
      });
    });
  });


  describe('deleteEventSuccess$', () => {
    it('should navigate to /events after deleting an event', () => {
      const action = EventsActions.DELETE_EVENT_SUCCESS();

      spyOn(router, 'navigate');

      actions$.next(action);
      effects.deleteEventSuccess$.subscribe(_ => {
        expect(router.navigate).toHaveBeenCalledWith(['/events']);
      });
    });

  });

  describe('addEditEventSuccess$', () => {
    it('should navigate to the event (/events/:id) adding or editing an event', () => {
      const action = EventsActions.CREATE_EVENT_SUCCESS({ event: eventMock });

      spyOn(router, 'navigate').and.callThrough();

      actions$.next(action);
      effects.addEditEventSuccess$.subscribe(_ => {
        expect(router.navigate).toHaveBeenCalledWith(['/events', eventMock.id]);
      });
    });

  });


  describe('errorMessage$', () => {
    it('should open the snack bar with the error message', () => {
      const errorMessage = 'error';
      const action = EventsActions.GET_EVENTS_FAILURE({ errorMessage });

      spyOn(snackBar, 'open');

      actions$.next(action);
      effects.errorMessage$.subscribe(_ => {
        expect(snackBar.open).toHaveBeenCalledWith(errorMessage);
      });
    });

  });

});
