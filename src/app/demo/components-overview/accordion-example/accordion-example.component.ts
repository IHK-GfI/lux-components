import { Component } from '@angular/core';
import { LuxModeType } from '../../../modules/lux-layout/lux-accordion/lux-accordion.component';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-accordion-example',
  templateUrl: './accordion-example.component.html',
  styleUrls: ['./accordion-example.component.scss']
})
export class AccordionExampleComponent {
  // region Helper-Properties für das Beispiel

  showOutputEvents = false;
  log = logResult;
  displayModes = ['flat', 'default'];

  // endregion

  // region Properties der Component

  disabled = false;
  disabled1Panel = false;
  disabled2Panel = false;
  hideToggle = false;
  hideToggle1Panel = false;
  hideToggle2Panel = false;
  expanded = true;
  expandedHeaderHeight = '64px';
  collapsedHeaderHeight = '64px';
  expandedHeaderHeight1Panel = '64px';
  collapsedHeaderHeight1Panel = '64px';
  expandedHeaderHeight2Panel = '64px';
  collapsedHeaderHeight2Panel = '64px';
  displayMode: LuxModeType = 'default';
  panelConfigArr: { title: string; description: string }[] = [
    { title: 'Panel #1', description: 'Beschreibung Panel #1' },
    { title: 'Panel #2', description: 'Beschreibung Panel #2' },
  ];

  _multiMode = true;

  get multiMode() {
    return this._multiMode;
  }

  set multiMode(multiMode: boolean) {
    this._multiMode = multiMode;

    if (!multiMode) {
      this.expanded = false;
    }
  }

  // endregion

  constructor() {}
}
