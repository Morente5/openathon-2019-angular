import { AuthService } from './../../core/services/auth.service';
import { AuthStoreFacadeService } from 'src/app/store/services/auth-store-facade.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { EventsStoreFacadeService } from '../store/services/events-store-facade.service';
import * as EventsActions from '../store/actions/events.actions';
import { Event } from '../model/event';
// import { EventService } from '../services/event.service';

import { fadeInBottom } from '../../shared/animations/animations';
import { EventService } from '../services/event.service';

@Component({
  selector: 'oevents-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInBottom],
})
export class AddEditEventComponent implements OnInit {

  public edit: boolean;

  public readonly addEditForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
    date: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]],
    addedBy: [''],
    imageUrl: [''],
    id: [''],
  });

  validationMessages = {
    title: {
      required: 'Title is required',
    },
    date: {
      required: 'Date is required',
    },
    location: {
      required: 'Location is required',
      minlength: 'Location is too short',
      maxlength: 'Location is too long',
    },
    description: {
      required: 'Description is required',
      minlength: 'Description is too short',
      maxlength: 'Description is too long',
    },
  };

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private eventsFacade: EventsStoreFacadeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.edit = this.route.snapshot.paramMap.has('id');

    if (this.edit) {
      // EDIT
      const id = this.route.snapshot.paramMap.get('id');
      this.eventService.getEvent(id).subscribe((event: Event) => {
        this.addEditForm.setValue(event);
      });
    }
  }

  errors(controlName): string[] {
    const control = this.addEditForm.get(controlName);
    return control.errors ? Object.keys(control.errors) : [];
  }

  onSubmit() {
    const currentEvent = this.addEditForm.value;
    this.edit ?
      this.eventsFacade.dispatch(EventsActions.EDIT_EVENT({ event: currentEvent })) :
      this.eventsFacade.dispatch(EventsActions.CREATE_EVENT({ event: currentEvent }));
  }
}
