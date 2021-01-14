import { Component } from '@angular/core';

@Component({
  selector: 'app-badge-notification-example',
  templateUrl: './badge-notification-example.component.html'
})
export class BadgeNotificationExampleComponent {
  notification = '0';
  color = 'default';
  disabled = false;
  hidden = false;
  position = 'above after';
  size = 'medium';
  overlap = true;
  cap;

  constructor() {}
}
