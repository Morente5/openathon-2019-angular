import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import { EventsStoreFacadeService } from '../store/services/events-store-facade.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { Event } from '../model/event';
import { of } from 'rxjs';
import { ImagesService } from './images.service';

const userMock = {
  id: '1',
  email: 'email',
  password: 'pass',
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
  user$: of(userMock),
  selectEvent$: () => of(eventMock),
  dispatch: () => { },
};
const imagesServiceStub = {
  getImage: () => of('imageUrl'),
};

describe('EventService', () => {
  let service: EventService;
  let imagesService: ImagesService;
  let eventsFacade: EventsStoreFacadeService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        EventService,
        { provide: EventsStoreFacadeService, useValue: eventsFacadeStub },
        { provide: ImagesService, useValue: imagesServiceStub },
      ],
    });
    eventsFacade = TestBed.get(EventsStoreFacadeService);
    service = TestBed.get(EventService);
    imagesService = TestBed.get(ImagesService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getEvents', () => {
    it('should fetch the events', () => {
      service.getEvents().subscribe();

      const req = http.expectOne(request =>
        request.method === 'GET' &&
        request.url === `${service.apiURL}/events`
      );

      expect(req.request.method).toEqual('GET');

      req.flush([eventMock]);
    });
    afterEach(() => {
      http.verify();
    });
  });

  describe('getEvent', () => {
    it('should fetch the event', () => {
      service.getEvent('pepe').subscribe();

      const req = http.expectOne(request =>
        request.method === 'GET' &&
        request.url === `${service.apiURL}/events/pepe`
      );

      expect(req.request.method).toEqual('GET');

      req.flush(eventMock);
    });
    afterEach(() => {
      http.verify();
    });
  });

  describe('updateEvent', () => {
    it('should update the event', () => {
      service.updateEvent(eventMock).subscribe();

      const req = http.expectOne(request =>
        request.method === 'PUT' &&
        request.url === `${service.apiURL}/events/${eventMock.id}`
      );

      expect(req.request.method).toEqual('PUT');

      req.flush(eventMock);
    });
    afterEach(() => {
      http.verify();
    });
  });

  describe('deleteEvent', () => {
    it('should delete the event', () => {
      service.deleteEvent('pepe').subscribe();

      const req = http.expectOne(request =>
        request.method === 'DELETE' &&
        request.url === `${service.apiURL}/events/pepe`
      );

      expect(req.request.method).toEqual('DELETE');

      req.flush(eventMock);
    });
    afterEach(() => {
      http.verify();
    });
  });

  describe('addEvent', () => {
    it('should add the event', () => {
      spyOn(imagesService, 'getImage').and.returnValue(of('ImageURL'));

      service.addEvent(eventMock).subscribe();

      const req = http.expectOne(request =>
        request.method === 'POST' &&
        request.url === `${service.apiURL}/events`
      );

      expect(req.request.method).toEqual('POST');

      req.flush(eventMock);
    });
    afterEach(() => {
      http.verify();
    });
  });
});
