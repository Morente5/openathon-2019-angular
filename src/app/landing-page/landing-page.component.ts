import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * The home page component
 */
@Component({
  selector: 'oevents-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
