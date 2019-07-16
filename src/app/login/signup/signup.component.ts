import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fadeInTop } from '../../shared/animations/animations';

import * as AuthActions from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'oevents-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInTop],
})
export class SignupComponent {

  public readonly signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private readonly store: Store<AppState>
  ) { }

  onSubmit() {
    this.store.dispatch(AuthActions.SIGN_UP({ credentials: this.signupForm.value }));
  }

}
