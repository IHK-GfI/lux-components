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
      iconName: 'lux-interface-login-circle',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Registrierung',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 1,
      class: 'lux-test-class'
    },
    {
      iconName: 'lux-interface-help-question-message',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'FAQ´s',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 2
    },
    {
      iconName: 'lux-interface-download-button-2',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Downloads',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 3
    },
    {
      iconName: 'lux-programming-bug',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Extralanges Beispiellabel zum Testen',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 4
    }
  ];

  menuItemsFa: ExampleMenuItem[] = [
    {
      iconName: 'fas fa-sign-in-alt',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Registrierung',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 1,
      class: 'lux-test-class'
    },
    {
      iconName: 'fas fa-question',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'FAQ´s',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 2
    },
    {
      iconName: 'fa-download',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Downloads',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 3
    },
    {
      iconName: 'fa-bug',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Extralanges Beispiellabel zum Testen',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 4
    }
  ];

  menuItemsMat: ExampleMenuItem[] = [
    {
      iconName: 'login',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Registrierung',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 1,
      class: 'lux-test-class'
    },
    {
      iconName: 'live_help',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'FAQ´s',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 2
    },
    {
      iconName: 'download',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Downloads',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 3
    },
    {
      iconName: 'bug_report',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Extralanges Beispiellabel zum Testen',
      tooltip: '',
      tooltipMenu: '',
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false,
      prio: 4
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
  tooltipMenu: string;
  alwaysVisible: boolean;
  round: boolean;
  hideLabelIfExtended: boolean;
  prio: number;
  class?: string;
}
