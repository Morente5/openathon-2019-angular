import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AuthStoreFacadeService } from '../store/services/auth-store-facade.service';

import { fadeInBottom } from '../shared/animations/animations';

@Component({
  selector: 'oevents-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInBottom],
})
export class ProfileComponent {
  public user$ = this.authFacade.user$;

  constructor(
    private readonly authFacade: AuthStoreFacadeService,
  ) { }

}
