import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge-notification-example',
  templateUrl: './badge-notification-example.component.html'
})
export class BadgeNotificationExampleComponent implements OnInit {
  notification = '0';
  color = 'default';
  disabled = false;
  hidden = false;
  position = 'above after';
  size = 'medium';
  overlap = true;
  cap;

  constructor() {}

  ngOnInit() {}
}
