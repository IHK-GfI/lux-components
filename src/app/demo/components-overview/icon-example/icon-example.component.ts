import { Component } from '@angular/core';
import { LuxIconColor, LuxIconColors } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-icon-example',
  templateUrl: './icon-example.component.html',
  styleUrls: ['./icon-example.component.scss']
})
export class IconExampleComponent {
  colors: LuxIconColor[] = LuxIconColors;
  iconSizes: string[] = ['1x', '2x', '3x', '4x', '5x'];
  iconName = 'lux-interface-favorite-like-1';
  iconSize = '2x';
  rounded = false;
  margin = '0';
  padding = '4px';
  backgroundColor = '';

  constructor() {}

}
