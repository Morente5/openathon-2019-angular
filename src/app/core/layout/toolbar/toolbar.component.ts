import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user';
import { AuthService } from '../../services/auth.service';

import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'oevents-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {

  private sub: Subscription = new Subscription();

  public user$;
  public isAuthenticated$;

  constructor(
    private router: Router,
    private authService: AuthService,
    private readonly store: Store<any>,
  ) {
    this.user$ = this.authService.user$;
    this.isAuthenticated$ = this.user$.pipe(map(user => !!user));
  }

  logout() {
    this.authService.logout();
  }

}
