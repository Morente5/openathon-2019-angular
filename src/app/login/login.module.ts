import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

// NgRx
import { StoreModule } from '@ngrx/store';
import { AuthStoreFacadeService } from '../store/services/auth-store-facade.service';

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
  providers: [
    AuthStoreFacadeService,
  ]
})
export class LoginModule { }
