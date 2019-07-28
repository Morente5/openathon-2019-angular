import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { retry, pluck } from 'rxjs/operators';

/**
 * Service to get a random inage
 */
@Injectable()
export class ImagesService {

  /**
   * The base URL for the request
   */
  public readonly baseURL = 'https://api.unsplash.com/photos/random';

  /**
   * The params for the request
   */
  private readonly params = {
    orientation: 'landscape',
    query: 'event',
  };

  /**
   * The headers for the request
   */
  private readonly headers = new HttpHeaders({
    Authorization: 'Client-ID 9f354e7919a3f56e537616f46b1c1e87b5632d7c7227f2bd469762eed79a6296'
  });

  constructor(private http: HttpClient) { }

  /**
   * Gets a random image url
   */
  getImage(): Observable<string> {
    return this.http
      .get<{ urls: { small: string } }>(this.baseURL, { headers: this.headers, params: this.params })
      .pipe(
        pluck('urls', 'small'),
        retry(3),
      );
  }

}
