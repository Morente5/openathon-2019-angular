import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    EventListComponent,
    EventDetailsComponent,
    AddEditEventComponent,
  ],
})
export class EventsModule { }
