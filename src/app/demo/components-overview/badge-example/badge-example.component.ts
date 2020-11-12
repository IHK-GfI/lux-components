import { Component } from '@angular/core';
import { LuxBackgroundColorsEnum } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-badge-example',
  templateUrl: './badge-example.component.html'
})
export class BadgeExampleComponent {
  colors: string[] = [...Object.keys(LuxBackgroundColorsEnum)];
  iconName: string = 'fas fa-save';
  text: string = 'Badge';
  uppercase: boolean = false;
  backgroundColor = '#ffffff';

  constructor() {}
}
