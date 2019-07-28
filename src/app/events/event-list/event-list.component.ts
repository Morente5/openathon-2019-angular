import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Event } from '../model/event';

import { AuthStoreFacadeService } from 'src/app/store/services/auth-store-facade.service';
import { EventsStoreFacadeService } from '../store/services/events-store-facade.service';
import * as EventsActions from '../store/actions/events.actions';

import { fadeInBottom } from './../../shared/animations/animations';

/**
 * Shows the event list
 */
@Component({
  selector: 'oevents-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInBottom],
})
export class EventListComponent implements OnInit {

  /**
   * Observable of the authenticated User
   */
  public auth$ = this.authFacade.user$;

  /**
   * Observable of all the events
   */
  public events$ = this.eventsFacade.events$;

  /**
   * Observable of the events added by the authenticated user
   */
  public myEvents$ = this.eventsFacade.myEvents$;

  /**
   * Boolean that represents if the user only wants to see their events
   */
  public seeMyEvents: boolean;

  constructor(
    private authFacade: AuthStoreFacadeService,
    private eventsFacade: EventsStoreFacadeService,
  ) { }

  /**
   * On Init lifecycle hook
   *
   * Dispatches GET_EVENTS
   */
  ngOnInit() {
    this.eventsFacade.dispatch(EventsActions.GET_EVENTS());
  }

  /**
   * Returns the id of the event provided as a parameter
   *
   * @param event an event
   * @returns the id of the event
   */
  byId(event: Event) {
    return event.id;
  }

}
