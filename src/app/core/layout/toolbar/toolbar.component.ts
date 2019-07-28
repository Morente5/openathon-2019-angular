import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'oevents-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {

  public user$;
  public isAuthenticated$;

  constructor(
    private router: Router,
    private readonly authService: AuthService,
  ) {
    this.user$ = this.authService.user$;
    this.isAuthenticated$ = this.user$.pipe(map(user => !!user));
  }

  logout() {
    this.authService.logout();
  }

}
