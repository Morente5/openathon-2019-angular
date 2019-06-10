import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from './shared/shared.module';
import { EventsModule } from './events/events.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';

// Components
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    EventsModule,
    LoginModule,
    ProfileModule,
  ],
  declarations: [
    AppComponent,
    LandingPageComponent,
    ToolbarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
