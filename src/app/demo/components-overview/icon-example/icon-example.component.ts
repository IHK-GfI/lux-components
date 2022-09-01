import { Component } from '@angular/core';
import { LuxIconColor, LuxIconColors } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-icon-example',
  templateUrl: './icon-example.component.html'
})
export class IconExampleComponent {
  colors: LuxIconColor[] = LuxIconColors;
  iconSizes: string[] = ['1x', '2x', '3x', '4x', '5x'];
  iconName = 'thumb_up';
  iconSize = '2x';
  rounded = false;
  margin = '0';
  padding = '4px';
  backgroundColor = '';

  constructor() {}
}
