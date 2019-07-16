import { OnDestroy } from '@angular/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fadeInTop } from '../shared/animations/animations';

import * as AuthActions from '../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';

@Component({
  selector: 'oevents-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInTop],
})
export class LoginComponent {

  public readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<AppState>
  ) { }

  onSubmit() {
    this.store.dispatch(AuthActions.LOG_IN({ credentials: this.loginForm.value }));
  }

}
