import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fadeInBottom } from '../../shared/animations/animations';

import { AuthStoreFacadeService } from 'src/app/store/services/auth-store-facade.service';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'oevents-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInBottom],
})
export class SignupComponent {

  public readonly signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private readonly authFacade: AuthStoreFacadeService,
  ) { }

  onSubmit() {
    this.authFacade.dispatch(AuthActions.SIGN_UP({ credentials: this.signupForm.value }));
  }

}
