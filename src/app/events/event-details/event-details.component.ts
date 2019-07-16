import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Event } from '../model/event';
import { EventService } from '../services/event.service';

import { fadeInTop } from 'src/app/shared/animations/animations';

@Component({
  selector: 'oevents-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  animations: [fadeInTop],
})
export class EventDetailsComponent implements OnInit {

  event: Event;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(id).subscribe((event: Event) => {
      console.log(event);
      this.event = event;
    });
  }

  deleteEvent(event: Event) {
    console.log(event);
    this.eventService.deleteEvent(event.id).subscribe(() => {
      console.log('Event Removed');
      this.router.navigate(['/events']);
    });
  }

}
