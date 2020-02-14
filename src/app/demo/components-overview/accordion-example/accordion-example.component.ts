import { Component, OnInit } from '@angular/core';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-accordion-example',
  templateUrl: './accordion-example.component.html',
  styleUrls: ['./accordion-example.component.scss']
})
export class AccordionExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  showOutputEvents: boolean = false;
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
  multiMode = true;
  expandedHeaderHeight = '64px';
  collapsedHeaderHeight = '64px';
  expandedHeaderHeight1Panel = '64px';
  collapsedHeaderHeight1Panel = '64px';
  expandedHeaderHeight2Panel = '64px';
  collapsedHeaderHeight2Panel = '64px';
  displayMode = 'default';

  // endregion

  constructor() {}

  ngOnInit() {}
}
