import { Component } from '@angular/core';
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
      hideLabelIfExtended: false
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
      hideLabelIfExtended: false
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
      hideLabelIfExtended: false
    }
  ];

  // endregion

  // region Properties der Component

  displayExtended = true;
  displayMenuLeft = true;
  maximumExtended = 5;
  iconName = 'fas fa-bars';
  className = '';

  // endregion

  constructor() {}
}

interface ExampleMenuItem {
  iconName: string;
  raised: boolean;
  color: string;
  disabled: boolean;
  hidden: boolean;
  label: string;
  tooltip: string;
  alwaysVisible: boolean;
  round: false;
  hideLabelIfExtended: false;
}
