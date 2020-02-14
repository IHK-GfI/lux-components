import { Component, OnInit } from '@angular/core';
import { LuxBackgroundColorsEnum } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-icon-example',
  templateUrl: './icon-example.component.html'
})
export class IconExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  colors: string[] = ['Keine Farbe', ...Object.keys(LuxBackgroundColorsEnum)];
  iconSizes: string[] = ['1x', '2x', '3x', '4x', '5x'];

  // endregion

  // region Properties der Component

  iconName: string = 'fas fa-save';
  iconSize: string = '2x';
  rounded: boolean = false;
  margin: string = '0';
  padding: string = '4px';
  color: string = 'Keine Farbe';

  // endregion

  constructor() {}

  ngOnInit() {}
}
