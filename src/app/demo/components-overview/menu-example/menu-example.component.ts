import { Component, OnInit } from '@angular/core';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-menu-example',
  templateUrl: './menu-example.component.html'
})
export class MenuExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  showOutputEvents: boolean = false;
  log = logResult;

  menuItems: ExampleMenuItem[] = [
    {
      iconName: 'fas fa-address-book',
      raised: false,
      color: 'primary',
      disabled: false,
      hidden: false,
      label: 'Menu-Item 0',
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
      alwaysVisible: false,
      round: false,
      hideLabelIfExtended: false
    }
  ];

  // endregion

  // region Properties der Component

  displayExtended: boolean = true;
  displayMenuLeft: boolean = true;
  maximumExtended: number = 5;
  iconName: string = 'fas fa-bars';
  className: string = '';

  // endregion

  constructor() {}

  ngOnInit() {}
}

interface ExampleMenuItem {
  iconName: string;
  raised: boolean;
  color: string;
  disabled: boolean;
  hidden: boolean;
  label: string;
  alwaysVisible: boolean;
  round: false;
  hideLabelIfExtended: false;
}
