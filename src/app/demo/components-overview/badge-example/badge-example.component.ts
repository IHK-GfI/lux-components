import { Component, OnInit } from '@angular/core';
import { LuxBackgroundColorsEnum } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-badge-example',
  templateUrl: './badge-example.component.html'
})
export class BadgeExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  colors: string[] = [...Object.keys(LuxBackgroundColorsEnum)];

  // endregion

  // region Properties der Component

  iconName: string = 'fas fa-save';
  color: string = 'gray';
  text: string = 'Badge';
  uppercase: boolean = false;

  // endregion

  constructor() {}

  ngOnInit() {}
}
