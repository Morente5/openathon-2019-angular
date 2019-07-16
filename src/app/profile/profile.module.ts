import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
  ],
  declarations: [ProfileComponent],
})
export class ProfileModule { }
