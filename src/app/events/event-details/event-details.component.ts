import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';

import { EventsStoreFacadeService } from '../store/services/events-store-facade.service';
import * as EventsActions from '../store/actions/events.actions';

import { Event } from '../model/event';

import { fadeInBottom } from '../../shared/animations/animations';
import { AuthStoreFacadeService } from 'src/app/store/services/auth-store-facade.service';

/**
 * Shows the event details
 */
@Component({
  selector: 'oevents-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInBottom],
})
export class EventDetailsComponent implements OnInit {

  /**
   * Observable of the authenticated User
   */
  public auth$ = this.authFacade.user$;

  /**
   * Observable of the selected event
   */
  public event$;

  constructor(
    private route: ActivatedRoute,
    private eventsFacade: EventsStoreFacadeService,
    private authFacade: AuthStoreFacadeService,
  ) { }

  /**
   * On Init lifecycle hook
   *
   * Gets the id of the event and searches for it
   */
  ngOnInit() {
    const selectedEventId = this.route.snapshot.paramMap.get('id');
    this.event$ = this.eventsFacade.selectEvent$(selectedEventId);
    this.eventsFacade.dispatch(EventsActions.GET_EVENT_DETAIL({ selectedEventId }));
  }

  /**
   * Deletes an event
   *
   * Dispatches DELETE_EVENT
   *
   * @param event The event to delete
   */
  deleteEvent(event: Event) {
    this.eventsFacade.dispatch(EventsActions.DELETE_EVENT({ selectedEventId: event.id }));
  }

}
