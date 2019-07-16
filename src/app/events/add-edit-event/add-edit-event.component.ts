import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Event } from '../model/event';
import { EventService } from '../services/event.service';

import { fadeInTop } from '../../shared/animations/animations';

@Component({
  selector: 'oevents-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss'],
  animations: [fadeInTop],
})
export class AddEditEventComponent implements OnInit {

  addEditForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
    date: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]],
    addedBy: [''],
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
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.eventService.getEvent(id).subscribe((event: Event) => {
        this.fillForm(event);
      });
    }
  }

  fillForm(event: Event) {
    this.addEditForm.patchValue(event);
  }

  errors(controlName): string[] {
    const control = this.addEditForm.get(controlName);
    return control.errors ? Object.keys(control.errors) : [];
  }

  onSubmit() {
    const currentEvent = this.addEditForm.value;

    const action = currentEvent.id ?
      this.eventService.updateEvent(currentEvent) :
      this.eventService.addEvent(currentEvent);

    action.subscribe((event: Event) => {
      console.log(event);
      this.addEditForm.reset();
      this.router.navigate(['/events']);
    });
  }
}
