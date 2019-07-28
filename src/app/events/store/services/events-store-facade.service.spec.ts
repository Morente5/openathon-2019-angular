import { User } from 'src/app/model/user';
import { TestBed } from '@angular/core/testing';

import { EventsStoreFacadeService } from './events-store-facade.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store, createAction } from '@ngrx/store';
import { AppState } from '../events.state';

const userMock = {
  id: '1',
  email: 'email',
  password: 'pass',
};

describe('EventsStoreFacadeService', () => {
  let service: EventsStoreFacadeService;
  let store: MockStore<{ events: { events: Event[] }, auth: { user: User } }>;
  const initialState = { events: { events: [] }, auth: { user: userMock } };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EventsStoreFacadeService,
      provideMockStore({ initialState }),
    ],
  }));
  beforeEach(() => {
    service = TestBed.get(EventsStoreFacadeService);
    store = TestBed.get<Store<AppState>>(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('dispatch', () => {
    it('should dispath an action to the store', () => {
      const MockAction = createAction('[Mock]');
      spyOn(store, 'dispatch');
      service.dispatch(MockAction);
      expect(store.dispatch).toHaveBeenCalledWith(MockAction);
    });
  });

  describe('myEvents$', () => {
    it('should select the filtered events', () => {
      service.myEvents$.subscribe(events => expect(events).toBeDefined());
    });
  });

  describe('selectEvent$', () => {
    it('should select a specific event', () => {
      spyOn(store, 'select').and.callThrough();
      service.selectEvent$('1').subscribe(event => expect(store.select).toHaveBeenCalled());
    });
  });

});
