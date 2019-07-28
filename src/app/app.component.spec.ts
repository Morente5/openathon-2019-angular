import { AppState } from './store/app.state';
import { TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { AuthService } from './core/services/auth.service';
import { AuthStoreFacadeService } from './store/services/auth-store-facade.service';

describe('AppComponent', () => {

  let store: MockStore<{ auth: any }>;
  const initialState = { auth: {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LayoutModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        AuthService,
        AuthStoreFacadeService,
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.get<Store<AppState>>(Store);

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
