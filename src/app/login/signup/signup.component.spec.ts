import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthStoreFacadeService } from '../../store/services/auth-store-facade.service';
import * as AuthActions from '../../store/actions/auth.actions';

const authFacadeStub = {
  user$: of({
    id: '1',
    email: 'email',
    password: 'pass',
  }),
  dispatch: () => { },
};

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
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
      declarations: [SignupComponent],
      providers: [
        { provide: AuthStoreFacadeService, useValue: authFacadeStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.get(AuthStoreFacadeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should dispatch SIGN_UP', () => {
      spyOn(authFacade, 'dispatch');
      component.onSubmit();
      expect(authFacade.dispatch).toHaveBeenCalledWith(AuthActions.SIGN_UP({ credentials: component.signupForm.value }));
    });
  });

});
