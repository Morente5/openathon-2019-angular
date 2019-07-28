import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsComponent } from './event-details.component';
import { EventsStoreFacadeService } from '../store/services/events-store-facade.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthStoreFacadeService } from 'src/app/store/services/auth-store-facade.service';
import { of } from 'rxjs';

import * as EventsActions from '../store/actions/events.actions';
import { Event } from '../model/event';


const userMock = {
  id: '1',
  email: 'email',
  password: 'pass',
};

const authFacadeStub = {
  user$: of(userMock),
};

const eventMock: Event = {
  title: 'myTitle',
  location: '',
  date: new Date('2000-01-01'),
  description: '',
  addedBy: '',
  imageUrl: '',
  id: '33',
};

const eventsFacadeStub = {
  events$: of([]),
  selectEvent$: () => of(eventMock),
  dispatch: () => { },
};

const eventServiceStub = {
  getEvent: () => of(eventMock)
};
const activatedRouteStub = {
  snapshot: {
    paramMap: convertToParamMap({}),
  },
};

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;

  let eventsFacade: EventsStoreFacadeService;
  let route: ActivatedRoute;


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
      declarations: [
        EventDetailsComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: AuthStoreFacadeService, useValue: authFacadeStub },
        { provide: EventsStoreFacadeService, useValue: eventsFacadeStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    route = fixture.debugElement.injector.get(ActivatedRoute);
    eventsFacade = TestBed.get(EventsStoreFacadeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch GET_EVENT_DETAIL', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
    spyOn(eventsFacade, 'dispatch');
    component.ngOnInit();
    expect(eventsFacade.dispatch)
      .toHaveBeenCalledWith(EventsActions.GET_EVENT_DETAIL({ selectedEventId: '1' }));
  });


  describe('deleteEvent', () => {
    it('should dispatch DELETE_EVENT', () => {
      spyOn(eventsFacade, 'dispatch');
      component.deleteEvent(eventMock);
      expect(eventsFacade.dispatch)
        .toHaveBeenCalledWith(EventsActions.DELETE_EVENT({ selectedEventId: eventMock.id }));
    });
  });
});
