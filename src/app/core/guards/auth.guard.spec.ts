import { TestBed, getTestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';


const authServiceStub = {
  user$: of({
    id: '1',
    email: 'email',
    password: 'pass',
  }),
};

describe('AuthGuard', () => {
  let injector: TestBed;
  let authService: AuthService;
  let guard: AuthGuard;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceStub }
      ],
    });
    injector = getTestBed();
    authService = injector.get(AuthService);
    guard = injector.get(AuthGuard);
    router = injector.get(Router);
  });

  it('should redirect an unauthenticated user to the login route', () => {
    authService.user$ = of(null);
    spyOn(router, 'navigate');
    guard.canActivate().subscribe(result => expect(result).toBe(false));
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
  it('should let an authenticated user pass', () => {
    guard.canActivate().subscribe(result => expect(result).toBe(true));
  });

});
