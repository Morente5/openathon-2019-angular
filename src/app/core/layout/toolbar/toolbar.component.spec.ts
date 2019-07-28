import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';



const authServiceStub = {
  user$: of({
    id: '1',
    email: 'email',
    password: 'pass',
  }),
  logout: () => {},
};

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
      ],
      declarations: [
        ToolbarComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isAuthenticated$ should be truthy when user is authenticated', () => {
    component.isAuthenticated$.subscribe(isAuth => expect(isAuth).toBe(true));
  });

  describe('logout', () => {
    it('should call logout on AuthService', () => {
      spyOn(authService, 'logout');
      component.logout();
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
