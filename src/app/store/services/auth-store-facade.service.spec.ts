import { User } from './../../model/user';
import { TestBed } from '@angular/core/testing';

import { AuthStoreFacadeService } from './auth-store-facade.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store, createAction } from '@ngrx/store';
import { AppState } from '../app.state';


describe('AuthStoreFacadeService', () => {
  let service: AuthStoreFacadeService;
  let store: MockStore<{ auth: User }>;
  const initialState = { auth: null };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthStoreFacadeService,
      provideMockStore({ initialState }),
    ],
  }));
  beforeEach(() => {
    service = TestBed.get(AuthStoreFacadeService);
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

});
