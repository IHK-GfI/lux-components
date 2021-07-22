import { Component } from '@angular/core';
import { LuxBadgePosition, LuxBadgeSize } from "../../../modules/lux-directives/lux-badge-notification/lux-badge-notification.directive";

@Component({
  selector: 'app-badge-notification-example',
  templateUrl: './badge-notification-example.component.html'
})
export class BadgeNotificationExampleComponent {
  notification = '0';
  color = 'default';
  disabled = false;
  hidden = false;
  position: LuxBadgePosition = 'above after';
  size: LuxBadgeSize = 'medium';
  overlap = true;
  cap;
  noBorder = false;

  constructor() {}
}
