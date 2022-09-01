import { Component } from '@angular/core';
import { LuxThemePalette } from '../../../modules/lux-util/lux-colors.enum';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-menu-example',
  templateUrl: './menu-example.component.html'
})
export class MenuExampleComponent {
  // region Helper-Properties für das Beispiel

  showOutputEvents = false;
  log = logResult;

  menuItems: ExampleMenuItem[] = [
    {
      iconName: 'fas fa-address-book',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Menu-Item 0',
      tooltip: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 1
    },
    {
      iconName: 'fas fa-address-card',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Menu-Item 1',
      tooltip: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 2
    },
    {
      iconName: 'fas fa-id-card',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Menu-Item 2',
      tooltip: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 3
    }
  ];

  // endregion

  // region Properties der Component

  displayExtended = true;
  displayMenuLeft = true;
  maximumExtended = 5;
  iconName = 'fas fa-bars';
  menuTriggerIconShowRight = false;
  menuLabel = '';
  className = '';

  // endregion

  constructor() {}

}

interface ExampleMenuItem {
  iconName: string;
  raised: boolean;
  color: LuxThemePalette;
  disabled: boolean;
  hidden: boolean;
  label: string;
  tooltip: string;
  alwaysVisible: boolean;
  round: boolean;
  hideLabelIfExtended: boolean;
  prio: number;
}
