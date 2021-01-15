import { Component } from '@angular/core';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs-example.component.html'
})
export class TabsExampleComponent {
  showOutputEvents = false;
  log = logResult;

  activeTab = 0;
  animationActive = true;
  iconSize = '2x';
  displayDivider = true;
  lazyLoading = false;
  backgroundColor = '#ffffff';

  tabs: any[] = [
    {
      title: 'Title #1',
      disabled: false,
      iconName: 'fas fa-bookmark',
      showNotification: true,
      counterCap: 10,
      counter: 10
    },
    {
      title: 'Title #2',
      disabled: false,
      iconName: 'fas fa-user',
      showNotification: true,
      counterCap: undefined,
      counter: undefined
    },
    {
      title: 'Title #3',
      disabled: false,
      iconName: 'fas fa-check',
      showNotification: false,
      counterCap: 99,
      counter: 99
    }
  ];

  constructor() {}

  activeTabChanged($event) {
    this.log(this.showOutputEvents, 'luxActiveTabChanged', $event);
  }

  tabContentCreated(tab) {
    this.log(this.showOutputEvents, 'Tab-Content created', tab);
  }
}
