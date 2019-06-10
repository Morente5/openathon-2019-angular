import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
})
export class LoginModule { }
