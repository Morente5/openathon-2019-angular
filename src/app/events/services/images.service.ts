import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { retry, pluck } from 'rxjs/operators';

@Injectable()
export class ImagesService {

  public readonly baseURL = 'https://api.unsplash.com/photos/random';
  private readonly params = {
    orientation: 'landscape',
    query: 'event',
  };
  private readonly headers = new HttpHeaders({
    Authorization: 'Client-ID 9f354e7919a3f56e537616f46b1c1e87b5632d7c7227f2bd469762eed79a6296'
  });

  constructor(private http: HttpClient) { }


  getImage(): Observable<string> {
    return this.http
      .get<{ urls: { small: string } }>(this.baseURL, { headers: this.headers, params: this.params })
      .pipe(
        pluck('urls', 'small'),
        retry(3),
      );
  }

}
