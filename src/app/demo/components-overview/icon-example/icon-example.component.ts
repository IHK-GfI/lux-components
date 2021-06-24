import { Component } from '@angular/core';
import { LuxIconColors } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-icon-example',
  templateUrl: './icon-example.component.html'
})
export class IconExampleComponent {
  // region Helper-Properties für das Beispiel

  colors: string[] = LuxIconColors;
  iconSizes: string[] = ['1x', '2x', '3x', '4x', '5x'];

  // endregion

  // region Properties der Component

  iconName = 'thumb_up';
  iconSize = '2x';
  rounded = false;
  margin = '0';
  padding = '4px';
  backgroundColor = '';

  // endregion

  constructor() {}

}
