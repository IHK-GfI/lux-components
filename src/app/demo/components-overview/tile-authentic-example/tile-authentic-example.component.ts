import { Component } from '@angular/core';
import { LuxBadgeNotificationSize } from '../../../modules/lux-directives/lux-badge-notification/lux-badge-notification.directive';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-tile-authentic-example',
  templateUrl: './tile-authentic-example.component.html'
})
export class TileAuthenticExampleComponent {
  showIcon = true;
  showOutputEvents = false;

  label = 'Wetter';
  subTitle = 'Vorschau auf die kommende Woche'
  log = logResult;

  badgeCap = 20;
  badgeSize: LuxBadgeNotificationSize = 'medium';
  badgeColor = 'primary';
  showNotification = false;
  counter?: number;

  constructor() { }

}
