import { Component } from '@angular/core';
import { LuxThemePalette } from '../../../modules/lux-util/lux-colors.enum';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-menu-example',
  templateUrl: './menu-example.component.html'
})
export class MenuExampleComponent {
  showOutputEvents = false;
  log = logResult;
  menuItems: ExampleMenuItem[] = [
    {
      iconName: 'lux-interface-file-add',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Menu-Item 0',
      tooltip: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 1,
      class: 'lux-test-class'
    },
    {
      iconName: 'lux-file-signature',
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
      iconName: 'lux-file-download',
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
  displayExtended = true;
  displayMenuLeft = true;
  maximumExtended = 5;
  iconName = 'lux-interface-setting-menu-1';
  menuTriggerIconShowRight = false;
  menuLabel = '';
  className = '';

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
  class?: string;
}
