import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Event } from '../model/event';

import { AuthStoreFacadeService } from 'src/app/store/services/auth-store-facade.service';
import { EventsStoreFacadeService } from '../store/services/events-store-facade.service';
import * as EventsActions from '../store/actions/events.actions';

import { fadeInBottom } from './../../shared/animations/animations';

@Component({
  selector: 'oevents-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInBottom],
})
export class EventListComponent implements OnInit {

  public auth$ = this.authFacade.user$;
  public events$ = this.eventsFacade.events$;
  public myEvents$ = this.eventsFacade.myEvents$;

  public seeMyEvents: boolean;

  constructor(
    private authFacade: AuthStoreFacadeService,
    private eventsFacade: EventsStoreFacadeService,
  ) { }

  ngOnInit() {
    this.eventsFacade.dispatch(EventsActions.GET_EVENTS());
  }

  byId(event: Event) {
    return event.id;
  }

}
