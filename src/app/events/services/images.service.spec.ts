import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ImagesService } from './images.service';

describe('ImagesService', () => {
  let service: ImagesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ImagesService,
      ],
    });
    service = TestBed.get(ImagesService);
    http = TestBed.get(HttpTestingController);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getImage', () => {
    it('should fetch the events', () => {
      service.getImage().subscribe();

      const req = http.expectOne(request =>
        request.method === 'GET' &&
        request.url === `${service.baseURL}`
      );

      expect(req.request.method).toEqual('GET');

      req.flush({ urls: { small: 'url' } });
    });
    afterEach(() => {
      http.verify();
    });
  });
});
