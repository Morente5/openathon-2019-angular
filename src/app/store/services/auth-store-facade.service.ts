import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';

import { AppState, selectAuthUser } from '../app.state';

/**
 * Auth Facade Service.
 * Handles any interaction with the store.
 * When a component needs to dispatch an action or get the
 * result of a selector, it would instead call
 * the appropriate methods on the facade service.
 *
 * This service exposes the store, some actions, and some reducers
 */
@Injectable()
export class AuthStoreFacadeService {

  /**
   * Observable of the authenticated user
   */
  public user$ = this.store.select(selectAuthUser);

  constructor(private readonly store: Store<AppState>) { }

  /**
   * Dispatch the provided action on the store
   *
   * @param action The action to dispatch
   */
  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
