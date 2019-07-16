import { Component } from '@angular/core';

import { AuthService } from './core/services/auth.service';
import { Store } from '@ngrx/store';
import * as loginActions from './store/actions/auth.actions';

@Component({
  selector: 'oevents-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'open-events-front';
}
