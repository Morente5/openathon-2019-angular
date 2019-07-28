import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';
import { MatCardModule } from '@angular/material/card';
import { AuthStoreFacadeService } from 'src/app/store/services/auth-store-facade.service';
import { EventsStoreFacadeService } from '../store/services/events-store-facade.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Event } from './../model/event';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const authFacadeStub = {
  user$: of({
    id: '1',
    email: 'email',
    password: 'pass',
  }),
};
const eventsFacadeStub = {
  events$: of([]),
  myEvents$: of([]),
  dispatch: () => {},
};
describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        MatCardModule,
        MatSlideToggleModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
      declarations: [
        EventListComponent,
      ],
      providers: [
        { provide: AuthStoreFacadeService, useValue: authFacadeStub },
        { provide: EventsStoreFacadeService, useValue: eventsFacadeStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('byId', () => {
    it('should return the id of the event', () => {
      expect(component.byId({ id: 'p' } as Event)).toBe('p');
    });
  });
});
