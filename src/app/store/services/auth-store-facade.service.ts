import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';

import { AppState, selectAuthUser } from '../app.state';

@Injectable()
export class AuthStoreFacadeService {

  public user$ = this.store.select(selectAuthUser);

  constructor(private readonly store: Store<AppState>) { }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
