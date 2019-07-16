import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';

import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'add-edit/:id', component: AddEditEventComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
