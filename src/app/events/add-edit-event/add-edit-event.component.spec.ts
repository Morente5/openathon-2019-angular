import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEventComponent } from './add-edit-event.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EventsStoreFacadeService } from '../store/services/events-store-facade.service';
import { EventService } from '../services/event.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import * as EventsActions from '../store/actions/events.actions';

const eventMock = {
  title: 'myTitle',
  location: '',
  date: '',
  description: '',
  addedBy: '',
  imageUrl: '',
  id: '',
};

const eventsFacadeStub = {
  events$: of([]),
  selectEvent$: () => eventMock,
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

describe('AddEditEventComponent', () => {
  let component: AddEditEventComponent;
  let fixture: ComponentFixture<AddEditEventComponent>;

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
        AddEditEventComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: EventsStoreFacadeService, useValue: eventsFacadeStub },
        { provide: EventService, useValue: eventServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEventComponent);
    component = fixture.componentInstance;
    route = fixture.debugElement.injector.get(ActivatedRoute);
    eventsFacade = TestBed.get(EventsStoreFacadeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set the initial values when editing an event', () => {
    const getSpy = spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
    const hasSpy = spyOn(route.snapshot.paramMap, 'has').and.returnValue(true);
    component.ngOnInit();
    expect(hasSpy).toHaveBeenCalledWith('id');
    expect(getSpy).toHaveBeenCalledWith('id');
    expect(component.addEditForm.get('title').value).toBe('myTitle');
  });

  describe('onSubmit', () => {
    it('should dispatch EDIT_EVENT when it has an event id', () => {
      component.edit = true;
      spyOn(eventsFacade, 'dispatch');
      component.onSubmit();
      expect(eventsFacade.dispatch)
        .toHaveBeenCalledWith(EventsActions.EDIT_EVENT({ event: component.addEditForm.value }));
    });
    it(`should dispatch CREATE_EVENT when it doesn't have an event id`, () => {
      component.edit = false;
      spyOn(eventsFacade, 'dispatch');
      component.onSubmit();
      expect(eventsFacade.dispatch)
        .toHaveBeenCalledWith(EventsActions.CREATE_EVENT({ event: component.addEditForm.value }));
    });
  });

  describe('errors', () => {
    it('should return an array for the error names of a form control', () => {
      const errors = component.errors('location');
      expect(errors).toEqual(['required']);
    });
    it(`should return an empty array if a form control doesn't have any errors`, () => {
      const errors = component.errors('id');
      expect(errors).toEqual([]);
    });
  });

});
