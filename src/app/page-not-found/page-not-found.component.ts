import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Component to show when router does not match any route
 */
@Component({
  selector: 'oevents-page-not-found',
  templateUrl: './page-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent { }
