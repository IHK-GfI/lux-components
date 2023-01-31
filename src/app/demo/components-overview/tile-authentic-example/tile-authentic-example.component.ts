import { Component } from '@angular/core';
import { LuxBadgeNotificationSize } from '../../../modules/lux-directives/lux-badge-notification/lux-badge-notification.directive';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-tile-authentic-example',
  templateUrl: './tile-authentic-example.component.html',
  styleUrls: ['./tile-authentic-example.component.scss']
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
  counter?: number;
  _showNotification = false;

  get showNotification(){
    return this._showNotification;
  }

  set showNotification(show: boolean) {
    this._showNotification = show;

    if (show && this.counter) {
      this.counter = undefined;
    }
  }

  constructor() { }

}
