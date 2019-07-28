import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthStoreFacadeService } from '../store/services/auth-store-facade.service';
import * as AuthActions from '../store/actions/auth.actions';

const authFacadeStub = {
  user$: of({
    id: '1',
    email: 'email',
    password: 'pass',
  }),
  dispatch: () => { },
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authFacade: AuthStoreFacadeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthStoreFacadeService, useValue: authFacadeStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.get(AuthStoreFacadeService);
    fixture.detectChanges();
  });

  describe('onSubmit', () => {
    it('should dispatch LOG_IN', () => {
      spyOn(authFacade, 'dispatch');
      component.onSubmit();
      expect(authFacade.dispatch).toHaveBeenCalledWith(AuthActions.LOG_IN({ credentials: component.loginForm.value }));
    });
  });
});
