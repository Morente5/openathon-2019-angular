import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      map(user => !!user),
      tap(canActivate => {
        if (!canActivate) {
          this.router.navigate(['/login']);
        }
      }),
      take(1),
    );
  }
}
