import { Component } from '@angular/core';
import {
  LuxBadgeNotificationPosition,
  LuxBadgeNotificationSize
} from '../../../modules/lux-directives/lux-badge-notification/lux-badge-notification.directive';

@Component({
  selector: 'app-badge-notification-example',
  templateUrl: './badge-notification-example.component.html'
})
export class BadgeNotificationExampleComponent {
  notification = ' ';
  color = 'default';
  disabled = false;
  hidden = false;
  position: LuxBadgeNotificationPosition = 'above after';
  size: LuxBadgeNotificationSize = 'medium';
  overlap = true;
  cap = 0;
  noBorder = false;

  constructor() {}
}
