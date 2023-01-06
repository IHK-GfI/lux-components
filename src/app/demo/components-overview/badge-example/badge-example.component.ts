import { Component } from '@angular/core';
import { LuxBadgeColors } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-badge-example',
  templateUrl: './badge-example.component.html'
})
export class BadgeExampleComponent {
  colors = LuxBadgeColors;
  iconName = 'lux-interface-arrows-left-circle-1';
  text = 'Badge';
  uppercase = false;
  backgroundColor = '';

  constructor() {}
}
