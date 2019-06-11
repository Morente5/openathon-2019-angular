import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';


@Component({
  selector: 'oevents-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor() { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
