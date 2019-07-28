import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { map } from 'rxjs/operators';

/**
 * The toolbar for the app
 */
@Component({
  selector: 'oevents-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {

  /**
   * Observable of the authenticated user
   */
  public user$;

  /**
   * Observable of a boolean indicating user is authenticated
   */
  public isAuthenticated$;

  constructor(
    private readonly authService: AuthService,
  ) {
    this.user$ = this.authService.user$;
    this.isAuthenticated$ = this.user$.pipe(map(user => !!user));
  }

  /**
   * Logs out the user
   */
  logout() {
    this.authService.logout();
  }

}
