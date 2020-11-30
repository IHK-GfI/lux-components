import { Component } from '@angular/core';
import { LuxBadgeColors } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-badge-example',
  templateUrl: './badge-example.component.html'
})
export class BadgeExampleComponent {
  colors: string[] = LuxBadgeColors;
  iconName: string = 'fa-arrow-circle-right';
  text: string = 'Badge';
  uppercase: boolean = false;
  backgroundColor = '';

  constructor() {}
}
