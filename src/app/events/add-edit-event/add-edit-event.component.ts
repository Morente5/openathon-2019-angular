import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Event } from '../../models/event';
import { EventService } from '../../core/event.service';


@Component({
  selector: 'oevents-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit {
  addEditForm: FormGroup;
  event: Event;

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
        console.log(event);
        this.event = event;
        this.createForm();
      });
    } else {
      this.createForm();
    }
  }

  createForm() {
    if (this.event) {
      this.addEditForm = this.fb.group({
        title: [this.event.title, Validators.required],
        location: [this.event.location, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        date: [this.event.date, Validators.required],
        description: [this.event.description, [Validators.required, Validators.minLength(10), Validators.maxLength(400)]],
        addedBy: [this.event.addedBy],
        id: [this.event.id],
      });
    } else {
      this.addEditForm = this.fb.group({
        title: ['', Validators.required],
        location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        date: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]],
        addedBy: [''],
        id: [''],
      });
    }
  }

  errors(controlName): string[] {
    const control = this.addEditForm.get(controlName);
    return control.errors ? Object.keys(control.errors) : [];
  }

  onSubmit() {
    this.event = this.addEditForm.value;
    if (this.event.id) {
      this.eventService.updateEvent(this.event).subscribe((event: Event) => {
        console.log(event);
        this.addEditForm.reset();
        this.router.navigate(['/events']);
      });
    } else {
      this.eventService.addEvent(this.event).subscribe((event: Event) => {
        console.log(event);
        this.addEditForm.reset();
        this.router.navigate(['/events']);
      });
    }
  }
}
