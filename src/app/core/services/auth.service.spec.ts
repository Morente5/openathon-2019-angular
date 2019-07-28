import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { AuthStoreFacadeService } from 'src/app/store/services/auth-store-facade.service';
import * as AuthActions from '../../store/actions/auth.actions';
import { HttpParams } from '@angular/common/http';

const userMock = {
  id: '1',
  email: 'email',
  password: 'pass',
};

const authFacadeStub = {
  user$: of(userMock),
  dispatch: () => { },
};

describe('AuthService', () => {
  let service: AuthService;
  let authFacade: AuthStoreFacadeService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        { provide: AuthStoreFacadeService, useValue: authFacadeStub },
      ],
    });
    authFacade = TestBed.get(AuthStoreFacadeService);
    service = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch LOG_IN_SUCCESS_LS when user is in Local Storage', () => {
    spyOn(AuthService.prototype, 'getUserFromLS').and.returnValue(userMock);
    spyOn(authFacade, 'dispatch');
    const newAuthService = new AuthService(null, authFacade);
    expect(authFacade.dispatch).toHaveBeenCalledWith(AuthActions.LOG_IN_SUCCESS_LS({ user: userMock }));
  });
  it('should do nothing when user is not in local storage', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => null);
    spyOn(authFacade, 'dispatch');
    const newAuthService = new AuthService(null, authFacade);
    expect(authFacade.dispatch).toHaveBeenCalledTimes(0);
  });

  describe('login', () => {
    it('should call getUser', () => {
      spyOn(service, 'getUser');
      service.login(userMock);
      expect(service.getUser).toHaveBeenCalledWith(userMock);
    });
  });

  describe('signup', () => {
    it('should return a null observable when getUser fetches an already registered user', () => {
      spyOn(service, 'getUser').and.returnValue(of(userMock));
      service.signup(userMock).subscribe(user => expect(user).toBeNull());
    });
    it(`should call postUser when getUser doesn't find an already registered user`, () => {
      spyOn(service, 'postUser').and.returnValue(of(userMock));
      spyOn(service, 'getUser').and.returnValue(of(undefined));
      service.signup(userMock).subscribe(_ => expect(service.postUser).toHaveBeenCalledWith(userMock));
    });
  });

  describe('getUserFromLS', () => {
    it('should get the user from LS', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify(userMock));
      expect(service.getUserFromLS()).toBeTruthy();
    });
    it('should return null when LS item is not a valid JSON', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => 'not a valid json');
      expect(service.getUserFromLS()).toBeNull();
    });
  });

  describe('getUser', () => {
    it('should fetch the user', () => {
      service.getUser({ email: 'email', password: 'pass' }).subscribe();

      const req = http.expectOne(request =>
        request.method === 'GET' &&
        request.url === `${service.apiURL}/users`
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('email')).toEqual('email');

      req.flush(userMock);
    });
    afterEach(() => {
      http.verify();
    });
  });

  describe('postUser', () => {
    it('should post the user', () => {
      service.postUser({ email: 'email', password: 'pass' })
        .subscribe(user => {
          expect(user.email).toEqual('email');
        });

      const req = http.expectOne(`${service.apiURL}/users`);

      expect(req.request.method).toEqual('POST');

      req.flush(userMock);
    });
    afterEach(() => {
      http.verify();
    });
  });

  describe('logout', () => {
    it('should dispatch LOG_OUT', () => {
      spyOn(authFacade, 'dispatch');
      service.logout();
      expect(authFacade.dispatch).toHaveBeenCalledWith(AuthActions.LOG_OUT());
    });
  });

});
