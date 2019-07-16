import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';

// Services
import { EventService } from './services/event.service';

// Components
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';

@NgModule({
  imports: [
    SharedModule,
    EventsRoutingModule,
  ],
  declarations: [
    EventListComponent,
    EventDetailsComponent,
    AddEditEventComponent,
  ],
  providers: [
    EventService,
  ],
})
export class EventsModule { }
