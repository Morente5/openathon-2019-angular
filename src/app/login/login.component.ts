import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fadeInBottom } from '../shared/animations/animations';

import { AuthStoreFacadeService } from '../store/services/auth-store-facade.service';
import * as AuthActions from '../store/actions/auth.actions';

/**
 * Component that contains the login form
 */
@Component({
  selector: 'oevents-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInBottom],
})
export class LoginComponent {

  /**
   * The Login FormGroup
   */
  public readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authFacade: AuthStoreFacadeService,
  ) { }

  /**
   * Dispatches LOG_IN with the credentials of the login form
   */
  onSubmit() {
    this.authFacade.dispatch(AuthActions.LOG_IN({ credentials: this.loginForm.value }));
  }

}
