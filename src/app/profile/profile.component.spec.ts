import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { ProfileComponent } from './profile.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthStoreFacadeService } from '../store/services/auth-store-facade.service';


const authFacadeStub = {
  user$: of({
    id: '1',
    email: 'email',
    password: 'pass',
  }),
  dispatch: () => { },
};
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let authFacade: AuthStoreFacadeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
      declarations: [
        ProfileComponent,
      ],
      providers: [
        { provide: AuthStoreFacadeService, useValue: authFacadeStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.get(AuthStoreFacadeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
