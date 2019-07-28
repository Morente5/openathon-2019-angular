import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { eventsReducer } from './store/reducers/events.reducer';
import { EventsEffects } from './store/effects/events.effects';
import { EventsStoreFacadeService } from './store/services/events-store-facade.service';


// Services
import { EventService } from './services/event.service';
import { ImagesService } from './services/images.service';

// Components
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';

@NgModule({
  imports: [
    SharedModule,
    EventsRoutingModule,
    StoreModule.forFeature('events', eventsReducer),
    EffectsModule.forFeature([EventsEffects]),
  ],
  declarations: [
    EventListComponent,
    EventDetailsComponent,
    AddEditEventComponent,
  ],
  providers: [
    EventService,
    EventsStoreFacadeService,
    ImagesService,
  ],
})
export class EventsModule { }
