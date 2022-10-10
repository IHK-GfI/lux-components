import { Component, OnInit } from '@angular/core';
import { LuxBadgeNotificationPosition, LuxBadgeNotificationSize } from '../../../modules/lux-directives/lux-badge-notification/lux-badge-notification.directive';
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

  badgeContent = '';
  badgeCap = 20;
  badgePosition: LuxBadgeNotificationPosition = 'above after';
  badgeSize: LuxBadgeNotificationSize = 'medium';
  badgeColor = 'primary';
  badgeDisabled = false;

  constructor() { }

}