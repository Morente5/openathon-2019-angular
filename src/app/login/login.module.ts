import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

// NgRx
import { StoreModule } from '@ngrx/store';

// Components
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    SharedModule,
    StoreModule,
    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
})
export class LoginModule { }
